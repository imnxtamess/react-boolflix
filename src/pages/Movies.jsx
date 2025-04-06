import { useMoviesContext } from "../contexts/GlobalContext";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
export default function Movies() {
  const [dynamicId, setDynamicId] = useState("");
  const [actorList, setActorList] = useState([]);
  const {
    moviesAndShows,
    searchText,
    popMovies,
    scoreToStars,
    useFetchMovieDetails,
  } = useMoviesContext();

  const fetchedDetails = useFetchMovieDetails(dynamicId);

  useEffect(() => {
    if (dynamicId && fetchedDetails) {
      const actors = fetchedDetails.map((element) => [element.name]);
      actors.splice(5);

      setActorList(actors);
    }
  }, [dynamicId, fetchedDetails]);

  console.log(actorList);
  console.log(fetchedDetails);
  return (
    <>
      <main>
        <div className="container">
          <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 g-3">
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
                      {actorList.map((actor) => (
                        <p>{actor}</p>
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
