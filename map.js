console.log(itCampus);

const itCampusArray = itCampus.Sheet1;
console.log(itCampusArray)

const latlng = [];

// Opret kortet én gang
var map = L.map('map').setView([56.261095, 10.797427], 7);

// Disable scroll zoom initially
map.scrollWheelZoom.disable();

map.on('click', function () {
    map.scrollWheelZoom.enable();
});


// Leaflet tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Markers
itCampusArray.forEach(function(campus) {
    const latlngIndividual = campus['lat, lng'];
    const latlngIndividualArray = latlngIndividual.split(", ");

    const lat = parseFloat(latlngIndividualArray[0]);
    const lng = parseFloat(latlngIndividualArray[1]);

    L.marker([lat, lng]).addTo(map)
        .bindPopup(`${campus.Name}`);
});
