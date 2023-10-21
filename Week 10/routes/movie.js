const express = require("express");
const multer = require("multer");
const MovieController = require("../controllers/movieController.js");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/movies/:movieId/upload",
  upload.single("photo"),
  MovieController.uploadPhoto
);
router.get("/movies/:movieId", MovieController.getMovieById);
router.put("/movies/:movieId", MovieController.updateMovie);
router.delete("/movies/:movieId", MovieController.deleteMovie);

router.get("/movies/:movieId/photo", MovieController.getPhotoUrl);

module.exports = router;
