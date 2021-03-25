import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const search = () => {
    props.onSearch(searchTerm);
  };

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="SearchBar">
      <input
        onChange={handleTermChange}
        placeholder="Enter A Song, Album, or Artist"
      />
      <button onClick={search} className="SearchButton">
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
