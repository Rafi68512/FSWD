var express = require("express");
var router = express.Router();
var { signToken } = require("../utils/auth.js");
var pool = require("../db/query.js");

// Register
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

// Login
router.post("/login", (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [req.body.email, req.body.password],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        const token = signToken(results.rows[0]);
        res.json({
          token: token,
        });
      }
    }
  );
});

// GET Users With Pagination
router.get("/", function (req, res) {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  pool.query(
    `SELECT * FROM users LIMIT $1 OFFSET $2`,
    [limit, offset],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

// GET User By ID
router.get("/:id", function (req, res) {
  pool.query(
    `SELECT * FROM users WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

// POST User
router.post("/", function (req, res) {
  //   console.log(req.body);
  pool.query(
    `INSERT INTO users ("id", "email", "gender", "password", "role") VALUES ($1, $2, $3, $4, $5);`,
    [
      req.body.id,
      req.body.email,
      req.body.gender,
      req.body.password,
      req.body.role,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

// DELETE User
router.delete("/:id", function (req, res) {
  pool.query(
    `DELETE FROM users WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

// PUT User
router.put("/:id", function (req, res) {
  pool.query(
    `UPDATE users SET id = '${req.body.id}', email = '${req.body.email}', gender = '${req.body.gender}', password = '${req.body.password}', role = '${req.body.role}' WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

module.exports = router;
