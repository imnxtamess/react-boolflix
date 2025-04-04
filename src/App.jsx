import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { MoviesProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </BrowserRouter>
    </MoviesProvider>
  );
}
