document.addEventListener("DOMContentLoaded", () => {

    fetch('https://raw.githubusercontent.com/Lomi0001/FULLSTACK---Opgave-/refs/heads/main/optagelsesdata.json')
        .then(response => response.json())
        .then(data => {

            const ObjectData = data.Optagelsesdata[0];

            // Ret stavefejl (Labels / Values)
            const labels = ["Alder"];
            const values = [Number(ObjectData.alder)];
            const IndexData = ["id","køn","by"]



            const ctx = document.querySelector('#chart').getContext('2d');

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: `${ObjectData.uddannelse} (${ObjectData.by})`,
                        data: values
                    }]
                },
                options: {
                    responsive: true
                }
            });

        });
});