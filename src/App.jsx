import { useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=fa65a795";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }

    setSearchPerformed(true);
  };

  const handleRestart = () => {
    setSearchPerformed(false);
    setSearchTerm("");
    setMovies([]);
  };

  return (
    <div className="app">
      <h1 className="" onClick={handleRestart}>
        ReelQuest
      </h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {searchPerformed && movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : searchPerformed ? (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      ) : (
        <div className="description">
          <p>
            Welcome to ReelQuest! Your ultimate destination for finding movies
            of all genres and eras. Search our vast database to discover the
            perfect film for your next cinematic adventure. Get ready to embark
            on a thrilling movie hunt like never before!
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
