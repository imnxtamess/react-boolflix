import { useMoviesContext } from "../contexts/GlobalContext";

import { useState } from "react";
export default function TVShows() {
  const [dynamicId, setDynamicId] = useState("276880");
  const {
    moviesAndShows,
    searchText,
    scoreToStars,
    getTvShowActors,
    popTvShort,
    topTvShort,
    upcomingTvShort,
    getTvGenres,
  } = useMoviesContext();

  const actors = getTvShowActors(dynamicId);
  const genres = getTvGenres(dynamicId);

  return (
    <>
      <main>
        <div className="container">
          <h1 className="category-title my-3">Popoular Tv Shows Today</h1>
          <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4">
            {popTvShort.map((movie, index) => (
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
                      <strong>Actors:</strong>
                      {actors.map((actor, index) => (
                        <p key={index}>{actor}</p>
                      ))}
                      <strong>Genres:</strong>
                      {genres.map((genre, index) => (
                        <p key={index}>{genre}</p>
                      ))}
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
          <h1 className="category-title my-3">Popoular Tv Shows Today</h1>
          <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4">
            {topTvShort.map((movie, index) => (
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
                      <strong>Actors:</strong>
                      {actors.map((actor, index) => (
                        <p key={index}>{actor}</p>
                      ))}
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
          <h1 className="category-title my-3">Shows Airing Today</h1>
          <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-4">
            {upcomingTvShort.map((movie, index) => (
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
                      <strong>Actors:</strong>
                      {actors.map((actor, index) => (
                        <p key={index}>{actor}</p>
                      ))}
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
        </div>
      </main>
    </>
  );
}
