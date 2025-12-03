
// npm install express mysql2 cors // for at køre reqquire og cors

const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const {query} = require("express");
const app = express();

// Den lokale host vi brugte, for at querie direkte i webstorm, og få svaret ud i insomnia
const port = 8080;

app.use(cors());
app.use(express.json())

// For at kunne connecte til GitHub skrev vi vores koder hver især i configurations. På den måde kunne vi connecte til MySQL og bruge queriesne
const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
});
// Fejlmeddelelser, sådan at vi bedre kunne vide, hvilken specifik fejl der var. Kilde: chatGPT.com
connection.connect((err) => {
    if (err) {
        console.error("Fejl ved forbindelse til databasen:", err.message);
        process.exit(1); // Stop serveren hvis der er fejl
    } else {
        console.log("Forbundet til MySQL databasen!");

        app.listen(port, () => {
            console.log(`Server kører på port ${port}`);
        });
    }
});