document.addEventListener("DOMContentLoaded", () => {
    fetch('https://raw.githubusercontent.com/Lomi0001/FULLSTACK---Opgave-/refs/heads/main/pieChart%20query.json')
        .then(response => response.json())
        .then(data => {
            console.log("Data fra fetch:", data);

            // Arrays til Chart.js
            const labels = data.map(item => item.køn);           // "Mand", "Kvinde"
            const values = data.map(item => Number(item.antal)); // 447, 239

            // Hent canvas (forudsat <canvas class="chart">)
            const ctx = document.querySelector('.chart').getContext('2d');

            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values
                    }]
                },
                options: {
                    responsive: true
                }
            });
        })
        .catch(error => console.error("Fejl ved hentning af data:", error));
});
