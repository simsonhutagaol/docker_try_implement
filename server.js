const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

// Konfigurasi koneksi ke MySQL
const pool = mysql.createPool({
  host: "127.0.0.1:3306",
  user: "root",
  password: "password",
  database: "testdb",
});

// Endpoint: Buat tabel jika belum ada
app.get("/init", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255)
      )
    `);
    res.send("Tabel messages berhasil dibuat (jika belum ada).");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error membuat tabel.");
  }
});

// Endpoint: Tambah pesan
app.get("/add/:message", async (req, res) => {
  const { message } = req.params;
  try {
    await pool.query("INSERT INTO messages (text) VALUES (?)", [message]);
    res.send(`Pesan "${message}" berhasil ditambahkan.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error menambahkan pesan.");
  }
});

// Endpoint: Ambil semua pesan
app.get("/messages", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM messages");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error mengambil pesan.");
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
