var express = require("express");
var router = express.Router();
var { signToken } = require("../utils/auth.js");
var pool = require("../db/query.js");

router.post("/register", (req, res) => {
  const { id, email, gender, password, role } = req.body;

  // Email Check
  pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        if (results.rows.length > 0) {
          res.status(400).json({ error: "Email sudah terdaftar." });
        } else {
          // Add Users
          pool.query(
            `INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [id, email, gender, password, role],
            (error, results) => {
              if (error) {
                throw error;
              } else {
                // Create Token
                const token = signToken(results.rows[0]);
                res.json({
                  token: token,
                });
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
