document.addEventListener("DOMContentLoaded", () => {
    fetch('https://raw.githubusercontent.com/Lomi0001/FULLSTACK---Opgave-/refs/heads/main/pieChart%20query.json')
        .then(response => response.json())
        .then(antal => {
            console.log(antal);
            // HERE IS WHERE YOU WRITE YOUR CODE!!!!!!!!
        });
});
