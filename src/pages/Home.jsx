import { useMoviesContext } from "../contexts/GlobalContext";
import Header from "../components/Header";
import ReactCountryFlag from "react-country-flag";
export default function Home() {
  const { moviesPlusTv } = useMoviesContext();
  console.log(moviesPlusTv);

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
      <main className="pt-5">
        <div className="container">
          <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-3 text-center">
            {moviesPlusTv.map((movie) => (
              <div key={movie.id} className="col">
                <div className="card">
                  <ul className="list-unstyled">
                    <li>
                      <h1>{movie.title ? movie.title : movie.name}</h1>
                    </li>
                    <li>
                      <h3>
                        {movie.original_title
                          ? movie.original_title
                          : movie.original_name}
                      </h3>
                    </li>
                    <li>
                      <h5>
                        <ReactCountryFlag
                          countryCode={"en" ? "gb" : movie.original_language}
                          cdnUrl={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/`}
                          cdnSuffix="svg"
                          title={movie.original_language}
                          svg
                        />
                      </h5>
                    </li>
                    <li>
                      <span>{scoreToStars(movie.vote_average)}</span>
                    </li>
                    <li>
                      <img
                        width="154"
                        className="img-fuid"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                            : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`
                        }
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
