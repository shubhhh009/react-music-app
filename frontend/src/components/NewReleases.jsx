import { useContext, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { PlayerContext } from "../context/PlayerContext";

const NewReleases = ({
  setCurrentSongArtist,
  setCurrentSongImage,
  setCurrentSongTitle,
}) => {
  
  const { songsData = [], backendUrl } = useContext(PlayerContext);
  const [playingSong, setPlayingSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  const handlePauseClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingSong(null);
      setCurrentSongImage(null);
      setCurrentSongTitle(null);
      setCurrentSongArtist(null);
    }
  };

  const handlePlayClick = (song) => {
    if (playingSong?._id === song._id) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current.src = `${backendUrl}/${song.filePath}`;
    audioRef.current.play();
    setPlayingSong(song);

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const imageUrl = `${backendUrl}/${song.imageFilePath}`.replace(/\\/g, "/");
    setCurrentSongImage(imageUrl);
    setCurrentSongTitle(song.title);
    setCurrentSongArtist(song.artist);
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = e.target.value / 100;
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const progressBar = e.target;
      const newTime =
        ((e.clientX - progressBar.getBoundingClientRect().left) /
          progressBar.offsetWidth) *
        duration;
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="mt-3 py-3 px-2 mb-16">
      <div className="flex flex-row justify-between text-white items-center">
        <h1 className="text-lg font-bold">New Release</h1>
        <p className="text-sm text-red-500 hover:text-white cursor-pointer mr-2">
          See more
        </p>
      </div>

      <div className="grid grid-cols-4 mt-4 gap-4">
        {songsData.map((release) => (
          <div key={release._id} className="relative group">
            <img
              src={`${backendUrl}/${release.imageFilePath}`}
              className="w-full h-40 object-cover object-top rounded-lg"
              alt={release.title}
            />
            <div className="absolute h-40 w-full inset-0 flex items-end py-2 px-2 right-4 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <button
                className="bg-red-500 p-3 rounded-full text-white hover:bg-red-600"
                onClick={() =>
                  playingSong?._id === release._id
                    ? handlePauseClick()
                    : handlePlayClick(release)
                }
              >
                {playingSong?._id === release._id ? <FaPause /> : <FaPlay />}
              </button>
            </div>
            <div className="mt-2">
              <p className="text-white font-semibold">{release.title}</p>
              <p className="text-gray-400 text-sm">{release.artist}</p>
            </div>

            {playingSong?._id === release._id && (
              <div className="bottom-4 w-full flex items-center justify-between z-10">
                <label htmlFor="volume" className="text-white">
                  Volume
                </label>
                <input
                  id="volume"
                  type="range"
                  onChange={handleVolumeChange}
                  min="0"
                  max="100"
                  defaultValue="100"
                  className="w-16 h-0.5"
                />
              </div>
            )}

            {playingSong?._id === release._id && (
              <div
                className="w-full h-0.5 mt-2 cursor-pointer"
                onClick={handleProgressClick}
                style={{
                  background: `linear-gradient(to right, #ff0000 ${
                    (currentTime / duration) * 100
                  }%, #fff 0%)`,
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
