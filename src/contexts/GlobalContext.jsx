import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

// create a custom fetch hook
function useFetchMovies(searchText, language) {
  const [movies, setMovies] = useState([]);

  const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}&language=${language}}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [searchText, language]);
  return movies;
}

// create the custom provider component
function MoviesProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [language, setLanguage] = useState("en-EN");
  const movies = useFetchMovies(searchText, language);
  return (
    <MoviesContext.Provider
      value={{ movies, searchText, setSearchText, language, setLanguage }}
    >
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
