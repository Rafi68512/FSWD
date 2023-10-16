/**
 * @swagger
 * components:
 *  schemas:
 *      Movies:
 *          type: object
 *          required:
 *              - id
 *              - title
 *              - genres
 *              - year
 *          properties:
 *              id:
 *                  type: integer
 *                  description: This is id Movies
 *              title:
 *                  type: character varying
 *                  description: Title of Movies
 *              genres:
 *                  type: character varying
 *                  description: Movies Genres
 *              year:
 *                  type: character variying
 *                  description: Release Year
 *          example:
 *              id: 2
 *              title: When a Man Loves a Woman
 *              genres: Drama|Romance
 *              year: 1995
 *
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The Movies managing API
 * /movies?limit:
 *   get:
 *     summary: Get a Movie With Limit
 *     tags: [Movies]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movies'
 *     responses:
 *       200:
 *         desctiption: The created Movies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       500:
 *         description: Some server error
 *
 *   post:
 *     summary: Create a new Movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movies'
 *     responses:
 *       200:
 *         desctiption: The created Movies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Create a new Movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movies'
 *     responses:
 *       200:
 *         desctiption: The created Movies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Create a new Movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movies'
 *     responses:
 *       200:
 *         desctiption: The created Movies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movies'
 *       500:
 *         description: Some server error
 */

var express = require("express");
var router = express.Router();

var pool = require("../db/query.js");

// GET Movies
router.get("/", function (req, res) {
  pool.query(
    `SELECT * FROM movies ${
      req.query.limit ? "LIMIT " + req.query.limit : ""
    } `,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

// GET Movies By ID
router.get("/:id", function (req, res) {
  pool.query(
    `SELECT * FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

// POST Movies
router.post("/", function (req, res) {
  //   console.log(req.body);
  pool.query(
    `INSERT INTO movies ("id", "title", "genres", "year") VALUES ($1, $2, $3, $4);`,
    [req.body.id, req.body.title, req.body.genres, req.body.year],
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

// DELETE Movies
router.delete("/:id", function (req, res) {
  pool.query(
    `DELETE FROM movies WHERE id = ${req.params.id}`,
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

// PUT Movies
router.put("/:id", function (req, res) {
  pool.query(
    `UPDATE movies SET id = '${req.body.id}', title = '${req.body.title}', genres = '${req.body.genres}', year = '${req.body.year}' WHERE id = ${req.params.id}`,
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

//export this router to use in our index.js
module.exports = router;
