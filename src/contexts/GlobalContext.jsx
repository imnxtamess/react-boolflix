import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

// create the custom provider component
function MoviesProvider({ children, movies }) {
  return (
    <MoviesContext.Provider value={{ movies }}>
      {children}
    </MoviesContext.Provider>
  );
}

// create a custom fetch hook
function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const api_key = import.meta.env.MOVIE_DB_API_KEY;
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  });
  return movies;
}

// create the custom context hook
function useMoviesContext() {
  return useContext(MoviesContext);
}

//export everything

export { MoviesProvider, useFetchMovies, useMoviesContext };
