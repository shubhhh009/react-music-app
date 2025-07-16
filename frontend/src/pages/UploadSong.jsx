import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import assets from "../assets";
import axios from "axios";
import { toast } from "react-toastify";


const UploadSong = () => {
  const { backendUrl } = useContext(PlayerContext);
  const navigate = useNavigate();

  const [image , setImage] = useState(false);
  const [song , setSong] = useState(false);
  const [songData , setSongData] = useState({
    title: "",
    artist: ""
  })

  const onSubmitHandler = async (e) =>{
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('title', songData.title)
       formData.append('artist', songData.artist)
        formData.append('music', song)
         formData.append('image',image)

         const {data} = await axios.post(`${backendUrl}/api/admin/add-music`,formData,{
          headers:{
           'Content-Type': 'multipart/form-data'
          }
         })

         if(data.success){
          toast.success(data.message)
          navigate('/list-songs')
          setSongData({
            title:"",
            artist:""
          })
          setImage(false)
          setSong(false)
         }else{
          toast.error(data.message)
         }
    } catch (error) {
      console.log(error)
      toast.error("Error Occured , Song Not Uploaded")
    }
  }

  const onChangeHandler = async(e) =>{
     const {name,value} = e.target;
     setSongData({...songData,[name]: value})


  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={onSubmitHandler} className="flex flex-col max-w-xl w-full mx-auto p-6 gap-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm md:text-base font-medium">Upload Song</p>
          <input type="file" 
          id="song" 
          onChange={(e)=> setSong(e.target.files[0])}
          accept="audio/*" hidden />
          <label htmlFor="song">
            <img
              src={song ? assets.opload_added :assets.upload_song}
              className="w-20 h-20 md:w-24 md:h-24 cursor-pointer object-contain border border-gray-300 rounded-lg p-2"
              alt="Upload Song"
            />
          </label>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm md:text-base font-medium">Upload Image</p>
          <input type="file" id="image" accept="image/*" 
          onChange={(e)=> setImage(e.target.files[0])}
          hidden />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-20 h-20 md:w-24 md:h-24 cursor-pointer object-contain border border-gray-300 rounded-lg p-2"
              alt="Upload Image"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="title" className="text-sm md:text-base font-medium">Song Name</label>
          <input
            id="title"
            type="text"
            onChange={onChangeHandler}
            name="title"
            value={songData.title}
            className="bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none"
            placeholder="Song Name"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="artist" className="text-sm md:text-base font-medium">Artist Name</label>
          <input
            id="artist"
            type="text"
            onChange={onChangeHandler}
            name="artist"
            value={songData.artist}
            className="bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none"
            placeholder="Artist Name"
            required
          />
        </div>

        <button
          type="submit"
          className="text-sm md:text-base bg-black text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default UploadSong;



