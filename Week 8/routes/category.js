// category.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Menampilkan data list category
// Endpoint: GET /category
router.get("/", async (res) => {
  try {
    // Menampilkan list kategori film
    const result = await db.query("SELECT * FROM film_category");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Menampilkan data list film berdasarkan category
// Endpoint: GET /category/:categoryId/film
router.get("/:categoryId/film", async (req, res) => {
  try {
    const { categoryId } = req.params;
    // Menampilkan list film berdasarkan category
    const result = await db.query(
      "SELECT film.title, film_category.category_id FROM film JOIN film_category ON film.film_id = category_id WHERE category_id = $1",
      [categoryId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
