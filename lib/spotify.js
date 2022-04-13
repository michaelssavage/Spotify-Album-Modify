const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

export const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getPlaylistTracks = async (url, access_token) => {
  let totalsongs = [];
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const songs = response.data;
    totalsongs = totalsongs.concat(songs.items);
    let calls = Math.ceil(songs.total / songs.limit);
    if (calls > 1) {
      let next_url = songs.next;
      while (calls > 1) {
        if (next_url) {
          let response = await fetch(next_url, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          let moresongs = response.data;
          totalsongs = totalsongs.concat(moresongs.items);
          next_url = moresongs.next;
          calls--;
        }
      }
    }

    return totalsongs;
  } catch (err) {}
  return null;
};
