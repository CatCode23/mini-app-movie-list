require("dotenv").config();
const fetch = require('node-fetch');
const express = require("express");
const cors = require("cors");


const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

const PORT = 8081;
const app = express();
app.use(cors());
app.use(express.json());


app.get('/tmdb_movies', async (req, res) => {
  try {
    const API_KEY = process.env.TMDB_API_KEY;
    const page = 1;
    
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`
    );
    const data = await response.json();

    const movies = data.results.map(movie => ({
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      rating: movie.vote_average,
      plot: movie.overview,
      poster_path: movie.poster_path
    }));

    await knex('movies').insert(movies);
    
    res.json({ message: 'Database populated with movies successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/movies", async (req, res) => {
  knex("movies")
    .select("*")
    .then((movies) => res.json(movies))
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The movie you are looking for could not be found.",
      });
    });
});

app.get("/movies/:id", (req, res) => {
  knex("movies")
    .select("*")
    .where("id", req.params.id)
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) =>
      res.status(500).json({
        message: "Requested movie does not exist",
      })
    );
});
app.post("/movies", (req, res) => {
  knex("movies")
    .insert({ Title: req.body.Title })
    .returning("*")
    .then(([movie]) => res.status(201).json(movie))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.patch("/movies/:id", (req, res) => {
  knex("movies")
    .where({ id: req.params.id })
    .update(req.body)
    .returning("*")
    .then(([updated]) => res.json(updated))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.delete("/movies/:id", (req, res) => {
  knex("movies")
    .where({ id: req.params.id })
    .del()
    .returning("*")
    .then((deleted) => res.json({
         message: 'movie deleted successfully',
         deleted: deleted[0]
        }
    ))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
