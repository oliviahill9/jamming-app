const CLIENT_ID = "3fd348f59d734f189e2a0c789285b9db";
const REDIRECT_URI = "http://localhost:3000/";

let accessToken = "";

export const getAccessToken = () => {
  if (accessToken) {
    return accessToken;
  }
  if (window.location.href.match(/access_token=([^&]*)/)) {
    accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/");
    return accessToken;
  }
  window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
};

export const search = async (searchTerm) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const responseJson = await response.json();

  return responseJson.tracks.items.map((track) => {
    return {
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    };
  });
};

const getUserID = async (headers) => {
  const response = await fetch("https://api.spotify.com/v1/me", { headers });
  const responseJson = await response.json();

  return responseJson.id;
};

const createPlaylist = async (userID, name, headers) => {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userID}/playlists`,
    { headers, method: "POST", body: JSON.stringify({ name }) }
  );
  const responseJson = await response.json();

  return responseJson.id;
};

const addTracksToPlaylist = async (playlistID, trackURIs, headers) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    { headers, method: "POST", body: JSON.stringify({ uris: trackURIs }) }
  );
};

export const savePlaylist = async (playlistName, trackURIs) => {
  if (!playlistName || !trackURIs) {
    return;
  }
  const accessToken = getAccessToken();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const userID = await getUserID(headers);
  const playlistID = await createPlaylist(userID, playlistName, headers);
  await addTracksToPlaylist(playlistID, trackURIs, headers);
  return;
};

export default {
  getAccessToken,
  search,
  savePlaylist,
};
