document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:4000/salary")
        .then(response => response.json())
        .then(data => {

            const ctx3 = document.querySelector(".dashboard").getContext("2d");

            const forretningsservice     = document.querySelector("#forretningsservice");
            const kontorSekretaer        = document.querySelector("#kontorSekretaer");
            const omsorg                 = document.querySelector("#omsorg");
            const sygeplejeJordemoder    = document.querySelector("#sygeplejeJordemoder");
            const undervisningPaedagogik = document.querySelector("#undervisningPaedagogik");
            const sundhedsOmsorg         = document.querySelector("#sundhedsOmsorg");
            const sosuHjem               = document.querySelector("#sosuHjem");

            const BTN = document.querySelector("#SUB");

            const boxarrey = [
                forretningsservice,
                kontorSekretaer,
                omsorg,
                sygeplejeJordemoder,
                undervisningPaedagogik,
                sundhedsOmsorg,
                sosuHjem
            ];

            // Start med tom graf
            const chart = new Chart(ctx3, {
                type: "bar",
                data: {
                    labels: [],
                    datasets: [{
                        label: "Løn",
                        data: [],
                        backgroundColor: ["#FB6376"]
                    }]
                },
                options: {
                    responsive: true
                }
            });

            // Funktion der opbygger labels + values ud fra checkede bokse
            function tjekCheckbox() {

                const labels = [];
                const values = [];

                // Gå alle checkbokse igennem
                for (let i = 0; i < boxarrey.length; i++) {
                    const checkbox = boxarrey[i];

                    if (checkbox.checked) {
                        console.log(checkbox.id, "ER TIL");

                        // Her bruger vi indexet i data til at hente Salary
                        const salary = data[i].Salary;   // ret til data[i].salary hvis feltet er med lille s

                        labels.push(checkbox.id);        // fx "forretningsservice"
                        values.push(salary);             // fx 31000
                    } else {
                        console.log(checkbox.id, "ER FRA");
                    }
                }

                // Opdater chart med nye arrays
                chart.data.labels = labels;
                chart.data.datasets[0].data = values;
                chart.update();
            }

            // Knap click
            BTN.addEventListener("click", tjekCheckbox);
        })
        .catch(error => console.error("Fejl ved hentning af data:", error));
});
