  fetch('https://raw.githubusercontent.com/Lomi0001/FULLSTACK---Opgave-/refs/heads/main/optagelsesdata.json')
    .then(response => response.json())
    .then(data => {
        console.log(data.Optagelsesdata[0])

    })