import { useState } from 'react';

function SearchBar({ onSearch }) {
 const [search, setSearch] = useState('');

 const handleSubmit = (e) => {
   e.preventDefault();
   onSearch(search);
 };

 return (
   <form onSubmit={handleSubmit}>
     <input 
       type="text"
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       placeholder="Search movies..."
     />
     <button type="submit">Search</button>
   </form>
 );
}

export default SearchBar;