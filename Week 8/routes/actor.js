const express = require("express");
const router = express.Router();
const db = require("../db");

// Seeder untuk menambahkan 5 data baru pada tabel actor
// Endpoint: POST /actor/seed
router.post("/seed", async (req, res) => {
  try {
    // Seeder: Menambahkan 5 data aktor ke dalam tabel
    const actorData = [
      { first_name: "Akhmad", last_name: "Dani" },
      { first_name: "Eko", last_name: "Pandu" },
      { first_name: "Muhammad", last_name: "Rafi" },
      { first_name: "Muhammad", last_name: "Ivan" },
      { first_name: "Ikang", last_name: "Maulidan" },
    ];

    // Melakukan loop untuk menyisipkan data aktor ke dalam tabel
    for (const actor of actorData) {
      await db.query(
        "INSERT INTO actor (first_name, last_name) VALUES ($1, $2)",
        [actor.name]
      );
    }

    res.status(201).send("Seeding actor data successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
