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
  const popMovieShort = popMovie.slice(0, 10);
  return popMovieShort;
}

function useFetchTopMovies(language) {
  const [topMovie, setTopMovie] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=${language}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTopMovie(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [language]);
  const topMoviesShort = topMovie.slice(0, 10);
  return topMoviesShort;
}

function useFetchUpcomingMovies(language) {
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=${language}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUpcomingMovie(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [language]);
  const upcomingMoviesShort = upcomingMovie.slice(6, 16);
  return upcomingMoviesShort;
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
  const popTvShort = popTv.slice(0, 10);
  return popTvShort;
}

function useFetchTopTv(language) {
  const [topTv, setTopTv] = useState([]);
  useEffect(() => {
    fetch(`
https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=${language}`)
      .then((res) => res.json())
      .then((data) => {
        setTopTv(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [language]);
  const topTvShort = topTv.slice(0, 10);
  return topTvShort;
}

function useFetchUpcomingTv(language) {
  const [upcomingTv, setUpcomingTv] = useState([]);
  useEffect(() => {
    fetch(`

https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&language=${language}`)
      .then((res) => res.json())
      .then((data) => {
        setUpcomingTv(data.results);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [language]);
  const upcomingTvShort = upcomingTv.slice(0, 10);
  return upcomingTvShort;
}

function useFetchMovieCredits(id) {
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

function useFetchTvShowCredits(id) {
  const [tvShowCast, setTvShowCast] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}`)
      .then((res) => res.json())
      .then((data) => {
        setTvShowCast(data.cast);
      })
      .catch((err) => {
        console.log("ERROR");
      });
  }, [id]);
  return tvShowCast;
}

function getMovieActors(id) {
  const [actorList, setActorList] = useState([]);
  const fetchedMovieDetails = useFetchMovieCredits(id);
  useEffect(() => {
    if (id && fetchedMovieDetails) {
      const actors = fetchedMovieDetails.map((element) => [element.name]);
      actors.splice(5);
      setActorList(actors);
    }
  }, [id, fetchedMovieDetails]);
  return actorList;
}

function getTvShowActors(id) {
  const [actorList, setActorList] = useState([]);
  const fetchedTvShowDetails = useFetchTvShowCredits(id);
  useEffect(() => {
    if (id && fetchedTvShowDetails) {
      const actors = fetchedTvShowDetails.map((element) => [element.name]);
      actors.splice(5);
      setActorList(actors);
    }
  }, [id, fetchedTvShowDetails]);
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
  const popMoviesShort = useFetchPopMovies(language);
  const popTvShort = useFetchPopTv(language);
  const topMoviesShort = useFetchTopMovies(language);
  const upcomingMoviesShort = useFetchUpcomingMovies(language);
  const topTvShort = useFetchTopTv(language);
  const upcomingTvShort = useFetchUpcomingTv(language);

  return (
    <MoviesContext.Provider
      value={{
        moviesAndShows,
        popMoviesShort,
        topMoviesShort,
        upcomingMoviesShort,
        popTvShort,
        topTvShort,
        upcomingTvShort,
        searchText,
        setSearchText,
        language,
        setLanguage,
        scoreToStars,
        getMovieActors,
        getTvShowActors,
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
