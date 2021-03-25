import React from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

function Playlist(props) {
  const handleNameChange = (e) => {
    props.onNameChange(e.target.value);
  };
  return (
    <div className="Playlist">
      <input onChange={handleNameChange} defaultValue={"New Playlist"} />
      <TrackList
        isRemoval={true}
        onRemove={props.onRemove}
        tracks={props.tracks}
      />
      <button onClick={props.onSave} className="Playlist-save">
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
