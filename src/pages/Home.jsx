import { useMoviesContext } from "../contexts/GlobalContext";
export default function Home() {
  const { movies, searchText, setSearchText } = useMoviesContext();
  console.log(movies);
  return <input type="text" onChange={(e) => setSearchText(e.target.value)} />;
}
