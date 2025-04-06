import { useMoviesContext } from "../contexts/GlobalContext";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
export default function Movies() {
  const [dynamicId, setDynamicId] = useState("950387");
  const {
    moviesAndShows,
    searchText,
    popMovies,
    scoreToStars,
    getMovieActors,
  } = useMoviesContext();

  const actors = getMovieActors(dynamicId);

  return (
    <>
      <main>
        <div className="container">
          <h1>Trending Movies Today</h1>
          <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4">
            {popMovies.map((movie, index) => (
              <div
                key={`Key is ${movie.title}${movie.id}`}
                className="col d-flex justify-content-center"
              >
                <div
                  className="movieCard popCard"
                  onMouseOver={() => setDynamicId(movie.id)}
                >
                  <div className="hoverCard popCard">
                    <div className="text-white mt-2 p-2 text-start d-flex flex-column gap-2">
                      <strong>Title:</strong> <p>{movie.original_title}</p>
                      <strong>Overview:</strong> <p>{movie.overview}</p>
                      <strong>Actors:</strong>
                      {actors.map((actor, index) => (
                        <p key={index}>{actor}</p>
                      ))}
                    </div>
                  </div>
                  <img
                    className="cardImg"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                        : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`
                    }
                    alt={movie.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
