import netflixLogo from "../assets/netflixLogo.svg";

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <img src={netflixLogo} alt="" />
          </div>
        </nav>
      </header>
    </>
  );
}
