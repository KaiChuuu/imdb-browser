import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "@/components/common/SearchBar";

function Navbar() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-red w-full">
      <div className="mx-auto flex flex-wrap gap-5 justify-between items-center px-5 py-4 max-w-[1320px]">
        <Link to="/" className="flex items-center gap-2 text-base-xl font-bold">
          <div className="border p-2">IMDB</div>
          <div>Browser</div>
        </Link>

        <div className="flex gap-5 items-center">
          <SearchBar query={query} setQuery={setQuery} />
          <Link
            to={query.trim() ? `/search/${query.trim()}` : "#"}
            className="text-base-lg self-start rounded px-3 py-2 btn-default"
          >
            SEARCH
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
