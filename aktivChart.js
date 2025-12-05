document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:4000/salary')
        .then(response => response.json())
        .then(data => {


            const labelsIt = data.map(item => item.sector);
            const valuesIt = data.find(item => item.sector[0]);
            console.log(valuesIt)

            const labelsOther = data.map(item => item.sector);
            const valuesOther = data.slice(item => item[2]);
            console.log(valuesOther)

            const ctx3 = document.querySelector('.dashboard').getContext('2d');


            const forretningsservice = document.querySelector("#forretningsservice")
            const kontorSekretaer = document.querySelector("#kontorSekretaer")
            const omsorg = document.querySelector("#omsorg")
            const sygeplejeJordemoder = document.querySelector("#sygeplejeJordemoder")
            const undervisningPaedagogik = document.querySelector("#undervisningPaedagogik")
            const sundhedsOmsorg = document.querySelector("#sundhedsOmsorg")
            const sosuHjem = document.querySelector("#sosuHjem")
            const boxarry = [
                "forretningsservice",
                "kontorSekretaer",
                "omsorg",
                "sygeplejeJordemoder",
                "undervisningPaedagogik",
                "sundhedsOmsorg",
                "sosuHjem"
            ];

            function tjekCheckbox() {

                for (let i = 0; i < boxarry.length; i++) {

                    const box = document.getElementById(boxarry[i]);

                    if (box.checked) {
                        console.log(boxarry[i], "er TIL");
                    } else {
                        console.log(boxarry[i], "er FRA");
                    }

                }
            }

// Tilføj eventlistener til alle boxe
            boxarry.forEach(id => {
                const box = document.getElementById(id);
                box.addEventListener("change", tjekCheckbox);
            });



            new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: labelsIt, labelsOther,
                    datasets: [{
                        data: valuesIt, valuesOther
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch(error => console.error("Fejl ved hentning af data:", error));
})
