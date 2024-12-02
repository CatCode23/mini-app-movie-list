import { useState, useEffect } from "react";
import AddMovie from "./components/AddMovie";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const fetchMovies = () => {
    fetch("http://localhost:8081/movies")
      .then((res) => res.json())
      .then((movieList) => {
        setMovies(movieList);
        setFilteredMovies(movieList);
      })
      .catch((error) => console.error("Error:", error));
  };
console.log(movies)
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (searchTerm) => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8081/movies/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchMovies())
      .catch(error => console.error('Error:', error));
  };
  return (
    <div className="container">
      <h1>My Movie List</h1>
      <SearchBar onSearch={handleSearch} />
      <AddMovie onMovieAdded={fetchMovies} />
      <MovieList movies={filteredMovies} onDelete={handleDelete} />
  

    </div>
  );
}

export default App;
