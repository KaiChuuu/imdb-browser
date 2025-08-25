import { bgMovies } from "@/data/bg-movies";

function MovieBackground({ children }: { children: React.ReactNode }) {
  const posterTotal = 80;

  const posters = Array.from({ length: posterTotal }).map((_, i) =>
    bgMovies[i % bgMovies.length].replace(/\.jpg$/, "._V1_UX300.jpg")
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute left-0 top-0 flex flex-wrap"
        style={{
          width: `calc(100% + 300px)`, // Slightly wider to add last poster on right edge
        }}
      >
        {posters.map((poster, index) => (
          <div
            key={index}
            className="flex-none"
            style={{
              width: "10vw",
              height: "15vw",
              minWidth: "300px",
              minHeight: "450px",
            }}
          >
            <img
              src={poster}
              alt={`poster-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/93 pointer-events-none" />
      <div className="absolute inset-0 bg-red/7 pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default MovieBackground;
