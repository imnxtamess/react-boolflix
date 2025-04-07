import { useMoviesContext } from "../contexts/GlobalContext";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";
export default function SearchPage() {
  const [dynamicMovieId, setDynamicMovieId] = useState("950387");
  const [dynamicTvShowId, setDynamicTvShowId] = useState("276880");
  const {
    moviesAndShows,
    searchText,
    scoreToStars,
    getMovieActors,
    getTvShowActors,
    getMovieGenres,
  } = useMoviesContext();

  const movieActors = getMovieActors(dynamicMovieId);
  const tvShowActors = getTvShowActors(dynamicTvShowId);
  const genres = getMovieGenres(dynamicMovieId);
  return (
    <>
      <h1>Results for: {searchText}</h1>
      <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-md-2 row-cols-sm-1 g-4">
        {moviesAndShows.map((movie) => (
          <div key={movie.id} className="col d-flex justify-content-center">
            <div
              className="movieCard"
              onMouseOver={() => setDynamicMovieId(movie.id)}
            >
              <div className="hoverCard">
                <ul className="list-unstyled  mt-2 p-2 text-start">
                  <li>
                    <p>
                      <strong>Titolo:</strong>{" "}
                      {movie.title ? movie.title : movie.name}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Titolo originale:</strong>{" "}
                      {movie.original_title
                        ? movie.original_title
                        : movie.original_name}
                    </p>
                  </li>

                  <li className="d-flex justify-content-between mr-5">
                    <strong>
                      Voto:
                      <span>{scoreToStars(movie.vote_average)}</span>
                    </strong>
                    <div>
                      <strong>Lingua:</strong>{" "}
                      <ReactCountryFlag
                        countryCode={
                          movie.original_language === "en"
                            ? "gb"
                            : movie.original_language
                        }
                        cdnUrl={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/`}
                        cdnSuffix="svg"
                        title={movie.original_language}
                        svg
                      />
                    </div>
                  </li>
                  <li className="mt-2">
                    <strong>Actors:</strong>{" "}
                    {movieActors.map((actor, index) => (
                      <p key={index}>{actor}</p>
                    ))}
                  </li>
                  <li className="mt-2">
                    <strong>Genres:</strong>
                    {genres.map((genre, index) => (
                      <p key={index}>{genre}</p>
                    ))}
                  </li>

                  <li className="mt-2">
                    <strong>Overview:</strong> <p>{movie.overview}</p>
                  </li>
                </ul>
              </div>
              <img
                className="cardImg"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                    : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`
                }
                alt={movie.title}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
