const Movie = require("../models/Movie");

class MovieController {
  // Metode untuk mendapatkan data film berdasarkan ID
  static async getMovieById(req, res) {
    try {
      const { movieId } = req.params;
      const movie = await Movie.findByPk(movieId);

      if (!movie) {
        throw new Error("Movie not found");
      }

      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: error.message || "Internal Server Error" });
    }
  }

  // Metode untuk memperbarui data film berdasarkan ID
  static async updateMovie(req, res) {
    try {
      const { movieId } = req.params;
      const { title, genres, year } = req.body;

      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        throw new Error("Movie not found");
      }

      // Memperbarui data film
      movie.title = title;
      movie.genres = genres;
      movie.year = year;
      await movie.save();

      res.json({ message: "Movie updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message || "Internal Server Error" });
    }
  }

  // Metode untuk menghapus data film berdasarkan ID
  static async deleteMovie(req, res) {
    try {
      const { movieId } = req.params;

      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        throw new Error("Movie not found");
      }

      // Menghapus data film
      await movie.destroy();

      res.json({ message: "Movie deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message || "Internal Server Error" });
    }
  }

  // Metode untuk mengunggah foto film berdasarkan Id
  static async uploadPhoto(req, res) {
    try {
      const { movieId } = req.params;
      const { filename } = req.file;

      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      movie.photo = filename;
      await movie.save();

      return res.json({ message: "Photo uploaded successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Metode untuk mengambil URL gambar berdasarkan token
  static async getPhotoUrl(req, res) {
    try {
      const { movieId } = req.params;

      // Temukan data film berdasarkan ID
      const movie = await Movie.findByPk(movieId);

      // Jika film tidak ditemukan, kirim respons dengan status 404 (Not Found)
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      // Dapatkan URL gambar berdasarkan token dan nama file dari data film
      const photoToken = movie.photo; // Gantilah ini dengan kolom yang sesuai dari tabel database Anda
      const fileName = `${photoToken}-${namafileoriginal}.jpg`; // Gantilah namafileoriginal dengan nama file asli dari data film

      // Kembalikan URL gambar
      const photoUrl = `http://localhost:3000/uploads/${fileName}`;
      return res.json({ photoUrl });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = MovieController;
