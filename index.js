const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

app.use(cors());
app.use(bodyParser.json());

// ======================= CUSTOMERS =======================
app.get("/customers", (req, res) => {
    db.query("SELECT * FROM Customer", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/customers", (req, res) => {
    const { Name, Email, Password } = req.body;
    db.query("INSERT INTO Customer (Name, Email, Password) VALUES (?, ?, ?)", 
        [Name, Email, Password], 
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Customer added", id: result.insertId });
    });
});

// ======================= PRODUCTS =======================
app.get("/products", (req, res) => {
    db.query("SELECT * FROM Product", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/products", (req, res) => {
    const { Name, Price, Description } = req.body;
    db.query("INSERT INTO Product (Name, Price, Description) VALUES (?, ?, ?)", 
        [Name, Price, Description], 
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Product added", id: result.insertId });
    });
});

// ======================= ORDERS =======================
app.get("/orders", (req, res) => {
    db.query("SELECT * FROM Orders", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/orders", (req, res) => {
    const { Order_Amount, Order_Date, User_ID } = req.body;
    db.query("INSERT INTO Orders (Order_Amount, Order_Date, User_ID) VALUES (?, ?, ?)", 
        [Order_Amount, Order_Date, User_ID], 
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Order placed", id: result.insertId });
    });
});

// ======================= START SERVER =======================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});