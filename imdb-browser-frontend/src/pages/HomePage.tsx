import HeroCarousel from "@/layouts/HeroCarousel";
import Navbar from "@/layouts/NavBar";
import MovieList from "@/layouts/MovieList";

function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroCarousel />

      <MovieList />
    </div>
  );
}

export default HomePage;
