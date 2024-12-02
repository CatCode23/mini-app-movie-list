import { useState } from 'react';

function AddMovie({ onMovieAdded }) {
 const [newMovie, setNewMovie] = useState('');

 const handleAddMovie = (e) => {
   e.preventDefault();
   fetch('http://localhost:8081/movies', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ title: newMovie }),
   })
     .then(res => res.json())
     .then(() => {
       onMovieAdded();
       setNewMovie('');
     })
     .catch(error => console.error('Error:', error));
 };

 return (
   <form onSubmit={handleAddMovie}>
     <input 
       type="text"
       value={newMovie}
       onChange={(e) => setNewMovie(e.target.value)}
       placeholder="Add new movie..."
     />
     <button type="submit">Add Movie</button>
   </form>
 );
}

export default AddMovie;