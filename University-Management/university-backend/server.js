const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "root", // Replace with your MySQL password
  database: "university", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Insert Operation
app.post("/insert", (req, res) => {
  const { table, data } = req.body;
  const query = `INSERT INTO ${table} SET ?`;
  db.query(query, data, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Record inserted successfully");
  });
});

// Update Operation
app.put("/update/:table/:id", (req, res) => {
  const { table, id } = req.params;
  const data = req.body;
  const query = `UPDATE ${table} SET ? WHERE ID = ?`;
  db.query(query, [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Record updated successfully");
  });
});

// Delete Operation
app.delete("/delete/:table/:id", (req, res) => {
  const { table, id } = req.params;
  const query = `DELETE FROM ${table} WHERE ID = ?`;
  db.query(query, id, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Record deleted successfully");
  });
});

// Search Operation
app.get("/search/:table/:id", (req, res) => {
  const { table, id } = req.params;
  const query = `SELECT * FROM ${table} WHERE ID = ?`;
  db.query(query, id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Display All Records
app.get("/display/:table", (req, res) => {
  const { table } = req.params;
  const query = `SELECT * FROM ${table}`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Start the Server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/display/:table", (req, res) => {
  const table = req.params.table;

  const validTables = ["student", "department", "instructor", "advisor"];
  if (!validTables.includes(table)) {
    return res.status(400).send({ error: "Invalid table name" });
  }

  const query = `SELECT * FROM ${table};`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: "Database query failed" });
    }
    res.send(results);
  });
});

