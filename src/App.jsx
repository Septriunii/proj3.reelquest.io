import { useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import bg from "./assets/bg.png";

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
      <img
        src={bg}
        className="absolute -z-50 top-5 md:top-10 lg:top-0"
        alt=""
      />
      <h1
        className="cursor-pointer text-3xl md:text-4xl lg:text-6xl font-bold text-orange-600 text-opacity-90 "
        onClick={handleRestart}
      >
        ReelQuest
      </h1>
      <div className="search md:w-[80%] lg:w-[70%] ">
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
        <div className="empty text-white text-opacity-50 text-center">
          <h2>No movies found</h2>
        </div>
      ) : (
        <div className="description mt-7 md:mt-14 lg:mt-20 text-base lg:text-lg w-2/3 text-white text-opacity-50 text-center">
          <p>
            Welcome to
            <span className="text-orange-600"> ReelQuest</span>! Your ultimate
            destination for finding movies of all genres and eras. Search our
            vast database to discover the perfect film for your next cinematic
            adventure. Get ready to embark on a thrilling movie hunt like never
            before!
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
