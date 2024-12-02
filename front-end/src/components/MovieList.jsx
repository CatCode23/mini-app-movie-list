import { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";

export default function MovieList({ movies, onDelete }) {
  const [watchedMovies, setWatchedMovies] = useState({});
  const [showWatched, setShowWatched] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const savedWatched = localStorage.getItem("watchedMovies");
    if (savedWatched) {
      setWatchedMovies(JSON.parse(savedWatched));
    }
  }, []);

  const handleToggleWatched = (id) => {
    const newWatchedMovies = {
      ...watchedMovies,
      [id]: !watchedMovies[id],
    };
    setWatchedMovies(newWatchedMovies);
    localStorage.setItem("watchedMovies", JSON.stringify(newWatchedMovies));
  };

  const filteredMovies = movies.filter((movie) => {
    if (showWatched === "watched") return watchedMovies[movie.id];
    if (showWatched === "toWatch") return !watchedMovies[movie.id];
    return true;
  });
  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => setShowWatched("all")}>All Movies</button>
        <button onClick={() => setShowWatched("watched")}>Watched</button>
        <button onClick={() => setShowWatched("toWatch")}>To Watch</button>
      </div>
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <span
              className="movie-title-clickable"
              onClick={() => setSelectedMovie(movie)}
            >
              {movie.title}
            </span>
            <button onClick={() => onDelete(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* if there is a selected movie, render the movie details popup */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          isWatched={watchedMovies[selectedMovie.id]}
          onToggleWatched={handleToggleWatched}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
