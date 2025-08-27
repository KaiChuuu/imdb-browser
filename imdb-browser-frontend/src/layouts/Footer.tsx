import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="text-center py-5 gap-3 flex flex-col items-center bg-red">
      <Link to="/" className="flex items-center gap-2 text-base-xl font-bold">
        <div className="border p-2">IMDB</div>
        <div>Browser</div>
      </Link>
      <a
        href="https://github.com/KaiChuuu/imdb-browser"
        target="_blank"
        rel="noopener noreferrer"
        className="text-base-md a-default"
      >
        github.com/KaiChuuu/imdb-browser
      </a>
      <div className="text-base-md text-white">8 / 24 / 2025</div>
    </div>
  );
}

export default Footer;
