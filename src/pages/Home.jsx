import { useMoviesContext } from "../contexts/GlobalContext";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";
export default function Home() {
  const { moviesPlusTv, searchText, popTv, popMovies } = useMoviesContext();
  console.log(popMovies);
  popMovies.splice(10, 10);
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

  return (
    <>
      <main>
        <div className="container-xl">
          {searchText === "" ? (
            <h1 className="categoryTitle">Trending Movies Today</h1>
          ) : null}
          <div
            className={`row ${
              searchText === ""
                ? "row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4"
                : "row-cols-xxl-4 row-cols-xl-3 row-cols-md-2 row-cols-sm-1 g-4"
            }  `}
          >
            {searchText === ""
              ? popMovies.map((movie) => (
                  <div
                    key={`Key is ${movie.title}${movie.id}`}
                    className="col d-flex justify-content-center"
                  >
                    <div className="movieCard popCard">
                      <div className="hoverCard popCard">
                        <div className=" text-white mt-2 p-2 text-start">
                          <strong>Overview:</strong> {movie.overview}
                        </div>
                      </div>
                      <img
                        className="cardImg"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                            : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`
                        }
                        alt={movie.title}
                      />
                    </div>
                  </div>
                ))
              : moviesPlusTv.map((movie) => (
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
        </div>
      </main>
    </>
  );
}
