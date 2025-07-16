import axios from "axios"
import { createContext, useEffect, useState } from "react"
import App from "../App";

export const PlayerContext = createContext();
 const PlayerContextProvider = ( { children }) => {
    

    const backendUrl = "http://localhost:4000"


    const [songsData,setSongsData] = useState([])

    const fetchSongs = async ()=>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/get-music`)
            setSongsData(data.musics)
        } catch (error) {
            
        }

    }

    useEffect(()=>{
        fetchSongs()
    },[])

    useEffect(() => {
  console.log("Songs inside Context:", songsData);
}, [songsData]);
const values = {

    backendUrl,
    songsData,
    fetchSongs
}

    return <PlayerContext.Provider value={values}>
        <App />
    </PlayerContext.Provider>
}

export default PlayerContextProvider