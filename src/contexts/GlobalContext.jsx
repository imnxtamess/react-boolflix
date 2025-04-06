import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

// create a custom fetch hook
function useFetchMoviesAndShows(searchText, language) {
  const [moviesAndShows, setMoviesAndShows] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${searchText}&language=${language}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMoviesAndShows(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [searchText, language]);
  return moviesAndShows;
}

function useFetchPopMovies(language) {
  const [popMovie, setPopMovie] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=${language}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPopMovie(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [language]);
  return popMovie;
}

function useFetchPopTv(language) {
  const [popTv, setPopTv] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=${language}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPopTv(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [language]);
  return popTv;
}

function useFetchMovieDetails(id) {
  const [movieCast, setMovieCast] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieCast(data.cast);
      })
      .catch((err) => {
        console.log("ERROR");
      });
  }, [id]);
  return movieCast;
}

function getMovieActors(id) {
  const [actorList, setActorList] = useState([]);
  const fetchedDetails = useFetchMovieDetails(id);
  useEffect(() => {
    if (id && fetchedDetails) {
      const actors = fetchedDetails.map((element) => [element.name]);
      actors.splice(5);
      setActorList(actors);
    }
  }, [id, fetchedDetails]);
  return actorList;
}

function scoreToStars(score) {
  const star = "\u{2B50}";
  const halfScore = parseFloat(score / 2).toFixed(1);
  let starArr = [];
  for (let index = 0; index <= halfScore; index++) {
    starArr.push(star);
  }

  starArr.join("");
  return starArr;
}
// create the custom provider component
function MoviesProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [language, setLanguage] = useState("en-EN");
  const moviesAndShows = useFetchMoviesAndShows(searchText, language);
  const popMovies = useFetchPopMovies(language);
  const popTv = useFetchPopTv(language);

  return (
    <MoviesContext.Provider
      value={{
        moviesAndShows,
        popMovies,
        popTv,
        searchText,
        setSearchText,
        language,
        setLanguage,
        scoreToStars,
        getMovieActors,
      }}
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
