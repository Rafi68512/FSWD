// film.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Menampilkan data seluruh list film
// Endpoint: GET /film
router.get("/", async (res) => {
  try {
    // Menampilkan seluruh list film
    const result = await db.query("SELECT * FROM film");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Menampilkan data film tertentu berdasarkan id
// Endpoint: GET /film/:filmId
router.get("/:filmId", async (req, res) => {
  try {
    const { filmId } = req.params;
    // Menampilkan film berdasarkan id
    const result = await db.query("SELECT * FROM film WHERE film_id = $1", [
      filmId,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send("Film not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
