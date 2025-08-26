import HeroCarousel from "@/layouts/HeroCarousel";
import Navbar from "@/layouts/NavBar";
import MovieList from "@/layouts/MovieList";
import Footer from "@/layouts/Footer";

import MovieBackground from "@/components/MovieBackground";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <MovieBackground>
          <HeroCarousel />
          <MovieList />
        </MovieBackground>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
