import HeroCarousel from "@/layouts/HeroCarousel";
import Navbar from "@/layouts/NavBar";
import MovieList from "@/layouts/MovieList";
import Footer from "@/layouts/Footer";

import MovieBackground from "@/components/MovieBackground";

function HomePage() {
  return (
    <div>
      <Navbar />

      <MovieBackground>
        <HeroCarousel />
        <MovieList />
      </MovieBackground>

      <Footer />
    </div>
  );
}

export default HomePage;
