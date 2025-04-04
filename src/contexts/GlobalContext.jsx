import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

// create a custom fetch hook
function useFetchMovies(searchText) {
  const [movies, setMovies] = useState([]);
  const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;
  console.log(api_key);
  useEffect(() => {
    if (!searchText) return;
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [searchText]);
  return movies;
}

// create the custom provider component
function MoviesProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const movies = useFetchMovies(searchText);
  return (
    <MoviesContext.Provider value={{ movies, searchText, setSearchText }}>
      {children}
    </MoviesContext.Provider>
  );
}

// create the custom context hook
function useMoviesContext() {
  return useContext(MoviesContext);
}

//export everything

export { MoviesProvider, useMoviesContext };
