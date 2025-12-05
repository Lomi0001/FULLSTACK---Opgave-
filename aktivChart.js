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
