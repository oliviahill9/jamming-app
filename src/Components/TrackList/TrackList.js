import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

function TrackList(props) {
  return (
    <div className="TrackList">
      {props.tracks.map((track) => (
        <Track
          isRemoval={props.isRemoval}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
          key={track.id}
          track={track}
        />
      ))}
    </div>
  );
}

export default TrackList;
