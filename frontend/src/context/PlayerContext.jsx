import axios from "axios";
import { createContext, useEffect, useState } from "react";
import App from "../App";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const apiBase = import.meta.env.VITE_API_URL;

  const [songsData, setSongsData] = useState([]);

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get(`${apiBase}/api/admin/get-music`);
      setSongsData(data.musics);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    console.log("Songs inside Context:", songsData);
  }, [songsData]);

  const values = {
    apiBase,
    songsData,
    fetchSongs
  };

  return (
    <PlayerContext.Provider value={values}>
      <App />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
