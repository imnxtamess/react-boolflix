import { useMoviesContext } from "../contexts/GlobalContext";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";
export default function Home() {
  const [dynamicMovieId, setDynamicMovieId] = useState("950387");
  const [dynamicTvShowId, setDynamicTvShowId] = useState("276880");
  const {
    moviesAndShows,
    searchText,
    popTvShort,
    popMoviesShort,
    scoreToStars,
    getMovieActors,
    getTvShowActors,
  } = useMoviesContext();

  const movieActors = getMovieActors(dynamicMovieId);
  const tvShowActors = getTvShowActors(dynamicTvShowId);
  console.log(dynamicTvShowId, dynamicMovieId);
  return (
    <>
      <main>
        <div className="container">
          {searchText === "" ? (
            <h1 className="categoryTitle my-3">Popoular Movies Right Now</h1>
          ) : null}

          {searchText === "" ? (
            <>
              <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4">
                {popMoviesShort.map((movie) => (
                  <div
                    key={`Key is ${movie.title}${movie.id}`}
                    className="col d-flex justify-content-center"
                  >
                    <div
                      className="movieCard popCard"
                      onMouseOver={() => setDynamicMovieId(movie.id)}
                    >
                      <div className="hoverCard popCard">
                        <div className="text-white mt-2 p-2 text-start d-flex flex-column gap-2">
                          <strong>Title:</strong> <p>{movie.original_title}</p>
                          <div>
                            <strong>Actors:</strong>
                            {movieActors.map((actor, index) => (
                              <p key={index}>{actor}</p>
                            ))}
                          </div>
                          <strong>Overview:</strong> <p>{movie.overview}</p>
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

              <h1 className="categoryTitle my-3">
                Popoular Tv Shows Right Now
              </h1>
              <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4">
                {popTvShort.map((tvShow) => (
                  <div
                    key={`Key is ${tvShow.title}${tvShow.id}`}
                    className="col d-flex justify-content-center"
                  >
                    <div
                      className="movieCard popCard"
                      onMouseOver={() => setDynamicTvShowId(tvShow.id)}
                    >
                      <div className="hoverCard popCard">
                        <div className="text-white mt-2 p-2 text-start">
                          <strong>Title:</strong> <p>{tvShow.original_name}</p>
                          <strong>Actors:</strong>
                          {tvShowActors.map((actor, index) => (
                            <p key={index}>{actor}</p>
                          ))}
                          <strong>Overview:</strong> <p>{tvShow.overview}</p>
                        </div>
                      </div>
                      <img
                        className="cardImg"
                        src={
                          tvShow.poster_path
                            ? `https://image.tmdb.org/t/p/w342${tvShow.poster_path}`
                            : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`
                        }
                        alt={tvShow.title}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1>Results for: {searchText}</h1>
              <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-md-2 row-cols-sm-1 g-4">
                {moviesAndShows.map((movie) => (
                  <div
                    key={movie.id}
                    className="col d-flex justify-content-center"
                  >
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
                            {movieActors.map((actor) => (
                              <p>{actor}</p>
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
                            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                            : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`
                        }
                        alt={movie.title}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
