import { useState } from "react";

import SearchBar from "@/components/common/SearchBar";

function Navbar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex justify-between bg-red text-base-xl text-white px-5 py-4">
      <div className="">IMDB Browser</div>

      <div className="flex gap-5">
        <SearchBar query={query} setQuery={setQuery} />
      </div>
    </div>
  );
}

export default Navbar;
