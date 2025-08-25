import { useState } from "react";

interface PosterProps {
  src: string;
  width?: string;
  height?: string;
}

function Poster({ src, width, height }: PosterProps) {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <div
      className="text-base-md flex items-center justify-center bg-stripes"
      style={{ width, height }}
    >
      No Image Available
    </div>
  ) : (
    <img
      src={src}
      onError={() => setFailed(true)}
      style={{ width, height }}
      alt="poster"
    />
  );
}

export default Poster;
