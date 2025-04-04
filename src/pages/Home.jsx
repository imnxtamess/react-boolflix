import { useMoviesContext } from "../contexts/GlobalContext";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { moviesPlusTv, searchText, setSearchText, language, setLanguage } =
    useMoviesContext();
  console.log(moviesPlusTv);

  return (
    <>
      <div className="container">
        <div className="d-flex mt-5 gap-3">
          <button onClick={() => setLanguage("it-IT")}>
            <ReactCountryFlag
              cdnUrl={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/`}
              cdnSuffix="svg"
              countryCode="it"
              title="it"
              svg
            />
          </button>
          <button onClick={() => setLanguage("en-EN")}>
            <ReactCountryFlag
              countryCode="gb"
              cdnUrl={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/`}
              cdnSuffix="svg"
              title="it"
              svg
            />
          </button>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={() => setSearchText(searchQuery)}
          >
            Search
          </button>
        </div>

        <div className="row">
          {moviesPlusTv.map((movie) => (
            <div key={movie.id} className="col">
              <div className="card">
                <h1>{movie.overview}</h1>
                <h1>{movie.title}</h1>
                <h3>{movie.original_title}</h3>
                <h5>
                  <ReactCountryFlag
                    countryCode={"en" ? "gb" : movie.original_language}
                    cdnUrl={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/`}
                    cdnSuffix="svg"
                    title={movie.original_language}
                    svg
                  />
                </h5>
                <span>{movie.vote_average}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
