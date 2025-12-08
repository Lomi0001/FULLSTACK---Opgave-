// Load environment variables
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



    console.log("✅ Forbundet til MySQL database!");

    // Start server when DB is ready

});

// Test-route
app.get("/", (req, res) => {
    console.log("asasdasdasdadsads")
    console.log("asasdasdasdadsads")
    console.log("asasdasdasdadsads")
    console.log("asasdasdasdadsads")
    res.send("Serveren kører og MySQL er forbundet!");
});

// Example route to fetch data
app.get("/salary", (req, res) => {
    db.query("SELECT sector, AVG(salary_2024) as Salary FROM salary_women WHERE sector = \"it\" UNION ALL SELECT job_name, salary_2024 FROM salary_women WHERE sector = \"other\"",
        (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get("/kon", (req, res) => {
    db.query("SELECT count(`køn`) as antal,`køn` FROM optagelsesdata GROUP BY `køn`",
        (err, results) => {
            if (err) return res.status(500).json({error: err.message});
            res.json(results);
        });
});

app.listen(port, (err) => {
    if (err) {
        console.error("❌ Server failed:", err);
        return;
    }
    console.log(`🚀 Server kører på port ${port}`);
});