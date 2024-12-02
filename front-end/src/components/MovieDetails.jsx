import React from "react";

export default function MovieDetails({
  movie,
  onClose,
  isWatched,
  onToggleWatched,
}) {
  return (
    <div className="movie-details-overlay">
      <div className="movie-details-panel">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{movie.Title}</h2>
        {movie.poster_path && (
            <img src = {`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt= {movie.title} 
            />
        )}
        <div className="movie-info">
          <p>
            <strong>Year:</strong> {movie.year}
          </p>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <p>
            <strong>Plot:</strong> {movie.plot}
          </p>
          <button onClick={() => onToggleWatched(movie.id)}>
            {isWatched ? "Mark as Unwatched" : "Mark as Watched"}
          </button>
        </div>
      </div>
    </div>
  );
}
