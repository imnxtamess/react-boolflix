import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import DefaultLayout from "./layouts/DefaultLayout";
import { MoviesProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Home} />
            <Route path="/tv-shows" Component={TVShows} />
            <Route path="/movies" Component={Movies} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MoviesProvider>
  );
}
