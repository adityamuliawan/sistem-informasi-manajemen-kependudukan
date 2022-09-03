const express = require("express");
const app = express();
const port = 3000;

// NEW variabel
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const mysql = require("mysql");
const path = require("path");

// NEW konfigurasi koneksi
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stt_duta_laksana",
});

// NEW connect ke database
connection.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

app.set("view engine", "ejs");

// Middleware configuration
app.use(express.static("node_modules"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Dashboard" });
});

app.get("/anggota", (req, res) => {
  let sql = "SELECT * FROM anggota";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render("anggota", { title: "Anggota", results: results});
  });
});

app.get("/sebaran", (req, res) => {
  let sql = "SELECT * FROM anggota";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render("sebaran", { title: "Sebaran", results: results });
  });
});

// NEW route untuk insert data
app.post("/save", (req, res) => {
  let data = { nama: req.body.nama, alamat: req.body.alamat };
  let sql = "INSERT INTO anggota SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/anggota");
  });
});

// NEW route untuk delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM anggota WHERE id="+req.body.id+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/anggota');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
