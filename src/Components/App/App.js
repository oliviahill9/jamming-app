import "./App.css";
import React from "react";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";

function App(props) {
  const [searchResults, setSearchResults] = React.useState([]);

  const [playlistName, setPlaylistName] = React.useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = React.useState([]);

  const addTrack = (track) => {
    if (
      playlistTracks.filter((playlistTrack) => playlistTrack.id === track.id)
        .length === 0
    ) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    const filteredTracks = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    setPlaylistTracks(filteredTracks);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async () => {
    const trackURIs = playlistTracks.map((playlistTrack) => playlistTrack.uri);
    await Spotify.savePlaylist(playlistName, trackURIs);
    setPlaylistName("My Playlist");
    setPlaylistTracks([]);
  };

  const search = async (searchTerm) => {
    console.log(searchTerm);
    const tracks = await Spotify.search(searchTerm);
    setSearchResults(tracks);
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults onAdd={addTrack} searchResults={searchResults} />
          <Playlist
            onSave={savePlaylist}
            onNameChange={setPlaylistName}
            onRemove={removeTrack}
            name={playlistName}
            tracks={playlistTracks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
