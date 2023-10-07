// index.js
const express = require("express");
const app = express();
const db = require("./db");

// Middleware untuk parsing body request
app.use(express.json());

app.get("/", (req, res) => {
  try {
    db.query("SELECT * FROM actor", (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result.rows);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan server.");
  }
});

// Routing
const filmRoutes = require("./routes/film");
const categoryRoutes = require("./routes/category");
app.use("/film", filmRoutes);
app.use("/category", categoryRoutes);

// Port server berjalan
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
