import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";

const Display = () => {
  const {
    songsData,
    backendUrl,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
  } = useContext(PlayerContext);

  const audioRef = useRef(new Audio());

  // Load new song when currentSong changes
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = `${backendUrl}/${currentSong.songFilePath}`;
      audioRef.current.load();

      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Audio play failed:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  const handlePlay = (song) => {
    if (currentSong?._id === song._id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-96 h-auto bg-gradient-to-r from-black to-gray-700 text-white rounded-xl p-3 m-3 overflow-scroll">
      <div className="flex flex-row justify-between items-center mt-3 py-2 px-2">
        <h1 className="font-bold text-md ">Top Streams </h1>
        <div className="flex flex-row items-center bg-gray-400 py-1 px-1 rounded-lg space-x-2">
          <p className="bg-red-500 text-white rounded-lg px-2 py-1">Local</p>
          <p className="text-white px-2 py-1">Global</p>
        </div>
      </div>

      <div className="mt-3 overflow-y-scroll">
        {Array.isArray(songsData) &&
          songsData.map((song, index) => (
            <div
              key={song._id}
              className="flex flex-row items-center justify-between py-2 px-2 hover:bg-gray-700 rounded-lg cursor-pointer"
            >
              <div className="flex flex-row items-center space-x-3">
                <p className="text-gray-400">{index + 1}</p>
                <img
                  src={`${backendUrl}/${song.imageFilePath}`}
                  alt={song.title}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
              </div>

              <button
                onClick={() => handlePlay(song)}
                className="text-white hover:text-green-400"
              >
                {currentSong?._id === song._id && isPlaying ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Display;
