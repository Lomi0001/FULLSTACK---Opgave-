document.addEventListener("DOMContentLoaded", () => {
    /*          Her er vores endpoint = http://localhost:4000/kon           */
    fetch("https://raw.githubusercontent.com/Lomi0001/FULLSTACK---Opgave-/refs/heads/main/DATA-pie-CHART.json")
        .then(res => res.json())
        .then(data => {

            const labels = data.map(d => d.køn);
            const values = data.map(d => Number(d.antal));

            new Chart(document.querySelector('.chart'), {
                type: 'pie',
                data: {
                    labels,
                    datasets: [{
                        data: values,
                        backgroundColor: ["rgba(104, 83, 77, 0.33)", "#800000"],
                        borderWidth: 0
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: false },
                        datalabels: {
                            color: ["rgba(104, 83, 77, 0.33)","#fff", ],
                            font: { weight: "bold", size: 30, family: "AppleMyungjo" },
                            formatter: (v, ctx) => {
                                const total = ctx.chart._metasets[0].total;
                                const pct = Math.round((v / total) * 100);
                                return `${ctx.chart.data.labels[ctx.dataIndex]}\n${pct}%`;
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        });
});
