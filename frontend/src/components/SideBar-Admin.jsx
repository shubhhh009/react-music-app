import logo from '../assets/logo.png'
import { IoIosAddCircle } from "react-icons/io"
import {IoMusicalNotes} from "react-icons/io5"
import {NavLink , useNavigate } from "react-router-dom"


const SideBarAdmin = () => {

  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-t from-black to-gray-500 min-h-screen space-y-16 p-[1vw] items-center flex flex-col ">
      <img src={logo} onClick={()=> navigate ('/')}  className="mt-1 w-44 hidden md:block cursor-pointer"/>



     <div className="flex flex-col gap-6 mt-10 w-full px-4">
         <NavLink
        to={'/add-music'}
        className="flex items-center gap-3 text-white text-base font-medium rounded-xl cursor-pointer hover:bg-gray-800 p-3"
       >
       <IoIosAddCircle className="w-12 h-12" />
         <p>Add Music</p>
       </NavLink>

       <NavLink
       to={'/list-songs'}
       className="flex items-center gap-3 text-white text-base font-medium rounded-xl cursor-pointer hover:bg-gray-800 p-3"
       >
       <IoIosAddCircle className="w-12 h-12" />
       <p>All Songs</p>
       </NavLink>
     </div>

    </div>
  )
}

export default SideBarAdmin