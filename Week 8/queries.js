const pool = require("./db");

const getAllActors = (request, response) => {
  pool.query("SELECT * FROM actor", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAllFilms = (request, response) => {
  pool.query("SELECT * FROM film", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getFilmById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM film WHERE film_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getAllCategories = (request, response) => {
  pool.query("SELECT * FROM category", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getFilmsByCategory = (request, response) => {
  const categoryId = parseInt(request.params.categoryId);

  pool.query(
    "SELECT * FROM film WHERE film_id IN (SELECT film_id FROM film_category WHERE category_id = $1)",
    [categoryId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// dynamic
const getFilmByActorId = (request, response) => {
  const actorId = parseInt(request.params.actorId);

  pool.query(
    "SELECT * FROM film WHERE film_id IN (SELECT film_id FROM film_actor WHERE actor_id = $1)",
    [actorId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getAllActors,
  getAllFilms,
  getFilmById,
  getAllCategories,
  getFilmsByCategory,
  getFilmByActorId,
};
