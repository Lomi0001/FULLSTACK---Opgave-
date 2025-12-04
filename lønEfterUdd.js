// Load environment variables

require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,                // eller den bruger du faktisk logger ind med
    password: process.env.DBPASSWORD, // din rigtige MySQL-adgangskode
    database: process.env.DBDATABASE           // eller hvad din database hedder
});



// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Kunne ikke forbinde til MySQL:", err);
        return;
    }

    console.log(process.env.DBHOST, process.env.DBUSER, process.env.DBPASSWORD, process.env.DBDATABASE);

    console.log("✅ Forbundet til MySQL database!");

    // Start server when DB is ready
    app.listen(port, (err) => {
        if (err) {
            console.error("❌ Server failed:", err);
            return;
        }
        console.log(`🚀 Server kører på port ${port}`);
    });
});

// Test-route
app.get("/", (req, res) => {
    res.send("Serveren kører og MySQL er forbundet!");
});

// Example route to fetch data
app.get("/data", (req, res) => {
    db.query("SELECT * FROM salary_women", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});