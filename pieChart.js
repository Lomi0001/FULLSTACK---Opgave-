document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:4000/kon')
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
                        backgroundColor: ["rgba(104, 83, 77, 0.33)", "#FB6376"],
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
