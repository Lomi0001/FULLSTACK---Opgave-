document.addEventListener("DOMContentLoaded", () => {
    /*          Her er vores endpoint = http://localhost:4000/salary           */
    fetch("https://raw.githubusercontent.com/Lomi0001/FULLSTACK---Opgave-/refs/heads/main/DATA-aktiv-Chart.json")
        .then(response => response.json())
        .then(data => {

            // 1. IT ligger på index 0 i dit JSON (jf. screenshot)
            const itRow = data[0];
            const itLabel = itRow.sector;                // "It"
            const itSalary = Number(itRow.Salary);       // "60988.5556" -> tal

            // 2. Canvas til dashboard-chart
            const ctx3 = document.querySelector(".dashboard").getContext("2d");

            // 3. Hent checkboxes
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

            // 4. Koble hver checkbox til et bestemt index i data
            // Justér index, hvis rækkefølgen i JSON er anderledes
            const sectorIndexMap = {
                forretningsservice: 6,      // fx "Arbejde inden for forretningsservice, økonomi, ..."
                kontorSekretaer: 1,      // "Almindeligt kontor- og kundeservicearbejde"
                detail: 2,      // "Service- og salgsarbejde" eller anden du ønsker
                sygeplejeJordemoder: 9,      // "Arbejde inden for sundhedsområdet"
                undervisningPaedagogik: 4,   // "Undervisning og pædagogisk arbejde"
                sosuHjem: 11       // samme her – tilpas efter dine ønsker
            };

            Chart.register(ChartDataLabels);

            // 5. Opret chart én gang – starter tomt
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

                // IT altid først — GRØN søjle
                labels.push(itLabel);
                values.push(itSalary);
                colors.push("#800000");  // rosa farve til IT

                // Resten af checkboxes — ROSA søjler
                for (let i = 0; i < boxarrey.length; i++) {
                    const checkbox = boxarrey[i];

                    if (checkbox.checked) {
                        const index = sectorIndexMap[checkbox.id];
                        const row = data[index];

                        labels.push(row.sector);
                        values.push(Number(row.Salary));
                        colors.push("rgba(104, 83, 77, 0.33)");   // rosa til alle andre
                    }
                }

                // Opdater chart
                chart.data.labels = labels;
                chart.data.datasets[0].data = values;
                chart.data.datasets[0].backgroundColor = colors;

                chart.update();
            }


            // 7. Knyt SUB-knappen til funktionen
            BTN.addEventListener("click", tjekCheckbox);
        })
        .catch(error => console.error("Fejl ved hentning af data:", error));
});
