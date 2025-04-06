import { useMoviesContext } from "../contexts/GlobalContext";
import ReactCountryFlag from "react-country-flag";
export default function Home() {
  const { moviesAndShows, searchText, popTv, popMovies, scoreToStars } =
    useMoviesContext();
  console.log(popMovies);
  popMovies.splice(15, 5);
  popTv.splice(15, 5);

  return (
    <>
      <main>
        <div className="container">
          {searchText === "" ? (
            <h1 className="categoryTitle">Trending Movies Today</h1>
          ) : null}

          {searchText === "" ? (
            <>
              <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4">
                {/* Map Function */}
                {popMovies.map((movie) => (
                  <div
                    key={`Key is ${movie.title}${movie.id}`}
                    className="col d-flex justify-content-center"
                  >
                    <div className="movieCard popCard">
                      <div className="hoverCard popCard">
                        <div className="text-white mt-2 p-2 text-start d-flex flex-column gap-2">
                          <strong>Title:</strong> <p>{movie.original_title}</p>
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

              <h1 className="categoryTitle mt-4">Trending Tv Shows Today</h1>
              <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4">
                {popTv.map((tvShow) => (
                  <div
                    key={`Key is ${tvShow.title}${tvShow.id}`}
                    className="col d-flex justify-content-center"
                  >
                    <div className="movieCard popCard">
                      <div className="hoverCard popCard">
                        <div className="text-white mt-2 p-2 text-start">
                          <strong>Overview:</strong> {tvShow.overview}
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
                    <div className="movieCard">
                      <div className="hoverCard">
                        <ul className="list-unstyled text-white mt-2 p-2 text-start">
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
                          <li className="mt-2"></li>
                          <li>
                            <strong>Overview:</strong> {movie.overview}
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
