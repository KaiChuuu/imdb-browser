function Footer() {
  return (
    <div className="py-5 gap-3 flex flex-col items-center bg-red">
      <div className="text-base-xl text-white">IMDB BROWSER</div>
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
