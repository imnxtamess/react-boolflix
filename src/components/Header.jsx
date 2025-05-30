import netflixLogo from "../assets/netflixLogo.svg";
import netflixicon from "../assets/nficon2023.ico";
import searchIcon from "../assets/searchIcon.svg";
import notificationBell from "../assets/notificationBell.svg";
import caret from "../assets/caret.svg";
import language from "../assets/language.svg";
import ReactCountryFlag from "react-country-flag";
import { useMoviesContext } from "../contexts/GlobalContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
export default function Header() {
  const { searchText, setSearchText, setLanguage } = useMoviesContext();
  const [searchBar, setSearchBar] = useState(false);
  const inputRef = useRef(null);
  function handleSearch(e) {
    setSearchText(e.target.value);
  }
  function handleSearchClick() {
    setSearchBar(true);
  }
  return (
    <>
      <header className="py-3">
        <nav className="d-flex align-items-center justify-content-between">
          <div className="leftnav d-flex  align-items-center">
            <div className="logo">
              <img id="xlLogo" src={netflixLogo} alt="Netflix Logo" />
              <img id="smLogo" src={netflixicon} alt="" />
            </div>
            <ul className="d-flex align-items-center gap-5 list-unstyled m-0">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li className="secondary_page">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to={"/tv-shows"}
                >
                  TV Shows
                </NavLink>
              </li>
              <li className="secondary_page">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to={"/movies"}
                >
                  Movies
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="rightnav d-flex gap-4 px-5">
            <div className="language d-flex align-items-center gap-3">
              <span onClick={() => setLanguage("it-IT")}>
                <ReactCountryFlag
                  cdnUrl={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/`}
                  cdnSuffix="svg"
                  countryCode="it"
                  title="Italian"
                  svg
                />
              </span>
              <span onClick={() => setLanguage("en-EN")}>
                <ReactCountryFlag
                  cdnUrl={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/`}
                  cdnSuffix="svg"
                  countryCode="gb"
                  title="English"
                  svg
                />
              </span>
            </div>

            {searchBar ? (
              <div className="d-flex searchbar ">
                <img
                  onClick={handleSearchClick}
                  src={searchIcon}
                  alt="Search Icon"
                />
                <input
                  ref={inputRef}
                  className="searchbarinput"
                  type="text"
                  placeholder="Movies, TV shows..."
                  onChange={handleSearch}
                  value={searchText}
                  onBlur={() => {
                    !searchText ? setSearchBar(false) : null;
                  }}
                  autoFocus
                />
              </div>
            ) : (
              <div className="d-flex searchbar border-0">
                <img onClick={handleSearchClick} src={searchIcon} alt="" />
              </div>
            )}
            <img id="bell" src={notificationBell} alt="Notification Bell" />
            <div className="profile">
              <img
                src="https://occ-0-2968-778.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABSJ157bYJWXoC-Bfwi9cbujgvw71MmxWPEeOV7D13XYW4mMMXi2vVwuuybCESwPyNpv5zl9ATvzXnoaCn1yaWH_hoYGTSnY.png?r=bfe"
                alt="Profile picture"
              />
              <img className="caret" src={caret} alt="drop down arrow" />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
