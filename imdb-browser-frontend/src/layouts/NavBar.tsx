import { useState } from "react";

import SearchBar from "@/components/common/SearchBar";

function Navbar() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-red w-full">
      <div className="mx-auto flex justify-between items-center px-5 py-4 max-w-[1320px]">
        <div className="text-base-xl">IMDB Browser</div>

        <div className="flex gap-5">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
