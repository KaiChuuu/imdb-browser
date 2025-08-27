interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full text-base-lg bg-black rounded py-2 px-3"
      />
    </div>
  );
};

export default SearchBar;
