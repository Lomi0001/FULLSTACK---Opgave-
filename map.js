console.log(itCampus);

const itCampusArray = itCampus.Sheet1;
console.log(itCampusArray);

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

// Definér dit custom SVG-ikon
const gavoIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/Lomi0001/FULLSTACK---Opgave-/main/logo/location-pin-svgrepo-com.svg",
    iconSize: [40, 40],     // justér hvis det virker for stort/lille
    iconAnchor: [20, 40],   // nederste midte = "spidsen"
    popupAnchor: [0, -40]   // popup lige over ikonet
});

// Markers – nu med dit ikon
itCampusArray.forEach(function(campus) {
    const latlngIndividual = campus['lat, lng'];
    const latlngIndividualArray = latlngIndividual.split(", ");

    const lat = parseFloat(latlngIndividualArray[0]);
    const lng = parseFloat(latlngIndividualArray[1]);

    L.marker([lat, lng], { icon: gavoIcon })
        .addTo(map)
        .bindPopup(`
    <b>${campus.name}</b><br>
    <a>${campus.adress}</a> <br>
    <a href="${campus.link}" target="_blank">Besøg hjemmeside</a>
`);
    
});
