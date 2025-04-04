import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

// create a custom fetch hook
function useFetchMovies(searchText, language) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}&language=${language}`
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

function useFetchTv(searchText, language) {
  const [tv, setTv] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${searchText}&language=${language}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTv(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [searchText, language]);

  return tv;
}
// create the custom provider component
function MoviesProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [language, setLanguage] = useState("en-EN");
  const moviesPlusTv = [
    ...useFetchMovies(searchText, language),
    ...useFetchTv(searchText, language),
  ];
  return (
    <MoviesContext.Provider
      value={{ moviesPlusTv, searchText, setSearchText, language, setLanguage }}
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
