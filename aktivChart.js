document.addEventListener("DOMContentLoaded", () => {
    /*          Her er vores endpoint = http://localhost:4000/salary           */
    fetch("https://raw.githubusercontent.com/Lomi0001/FULLSTACK---Opgave-/refs/heads/main/DATA-aktiv-Chart.json")
        .then(response => response.json())
        .then(data => {


            const itRow = data[0];
            const itLabel = itRow.sector;                // It
            const itSalary = Number(itRow.Salary);       // løn


            const ctx3 = document.querySelector(".dashboard").getContext("2d");


            const forretningsservice = document.querySelector("#forretningsservice");
            const kontorSekretaer = document.querySelector("#kontorSekretaer");
            const detail = document.querySelector("#detail");
            const sygeplejeJordemoder = document.querySelector("#sygeplejeJordemoder");
            const undervisningPaedagogik = document.querySelector("#undervisningPaedagogik");
            const sosuHjem = document.querySelector("#sosuHjem");

            const BTN = document.querySelector("#SUB");

            const boxarrey = [
                forretningsservice,
                kontorSekretaer,
                detail,
                sygeplejeJordemoder,
                undervisningPaedagogik,
                sosuHjem
            ];

            // 4. Koble hver checkbox til et bestemt index (data Json)
            const sectorIndexMap = {
                forretningsservice: 6,
                kontorSekretaer: 1,
                detail: 2,
                sygeplejeJordemoder: 9,
                undervisningPaedagogik: 4,
                sosuHjem: 11
            };

            Chart.register(ChartDataLabels);


            const chart = new Chart(ctx3, {
                type: "bar",
                data: {
                    labels: [],
                    datasets: [{
                        label: "Løn",
                        data: [],
                        backgroundColor: [],

                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },

                        datalabels: {
                            labels: {
                                // 1) Navn: lodret inde i søjlen
                                sector: {
                                    anchor: 'center',
                                    align: 'center',
                                    rotation: -90,
                                    color: '#fff',
                                    font: { weight: '1', size: 13, family:'DynaPuff' },
                                    formatter: (value, ctx) => ctx.chart.data.labels[ctx.dataIndex],
                                    clip: true
                                },

                                // 2) Tal: i toppen af søjlen
                                salary: {
                                    anchor: 'end',
                                    align: 'end',
                                    offset: 6,
                                    color: "#800000",
                                    font: { weight: '600', size: 13},
                                    formatter: (value) => `${Math.round(value).toLocaleString('da-DK')} kr.`
                                }
                            }
                        }
                    }
                    ,
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                display: false   // fjerner labels i bunden
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }
                    }
                }


            });

            // 6. Funktion til at opbygge data når du klikker SUB
            function tjekCheckbox() {
                const labels = [];
                const values = [];
                const colors = [];

                // IT altid først — rød søjle
                labels.push(itLabel);
                values.push(itSalary);
                colors.push("#800000");  // rosa farve til IT

                // Resten af checkboxes — grå søjler
                for (let i = 0; i < boxarrey.length; i++) {
                    const checkbox = boxarrey[i];

                    if (checkbox.checked) {
                        const index = sectorIndexMap[checkbox.id];
                        const row = data[index];

                        labels.push(row.sector);
                        values.push(Number(row.Salary));
                        colors.push("rgba(104, 83, 77, 0.33)");
                    }
                }

                // Opdater chart
                chart.data.labels = labels;
                chart.data.datasets[0].data = values;
                chart.data.datasets[0].backgroundColor = colors;

                chart.update();
            }


            // SUB-knap til funktion
            BTN.addEventListener("click", tjekCheckbox);
        })
        .catch(error => console.error("Fejl ved hentning af data:", error));
});
