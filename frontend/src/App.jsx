import { Route, Routes, useLocation } from "react-router-dom"
import SideBarAdmin from "./components/SideBar-Admin"
import UploadSong from "./pages/UploadSong"
import ListSong from "./pages/ListSong"
import SideBar from "./components/SideBar"
import Display from "./components/Display"
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const location = useLocation()
  const adminPaths = ["/add-music","/list-songs"]
  const isAdminPage = adminPaths.includes(location.pathname)
  return (
    <div className="flex relative h-screen">
        <ToastContainer position="top-center" />
     
      {isAdminPage ? (
        <>
        <SideBarAdmin />
        <div className="flex-1 overflow-y-scroll">
          <Routes>
         <Route path="/add-music" element={<UploadSong />} />
         <Route path="/list-songs" element={<ListSong />} />
         <Route path="*" element={<p className="text-white">Page not found</p>} />
       </Routes>
        </div>
        </>
      ):(
        <>
        <SideBar />
        <div className="flex-1 ml-64 bg-black overflow-y-scroll">
          <Header />
        </div>

        <div className="flex2 bg-black hidden lg:block p-2">
          <Display />
        </div>
        </>
      )}

    </div>
  )
}

export default App