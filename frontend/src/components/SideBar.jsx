import { FaHome, FaHeart, FaHeadphonesAlt } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // apna logo image yahan daalo

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Home", icon: <FaHome />, path: "/" },
    { label: "Browser", icon: <BiSearchAlt2 />, path: "/browse" },
    { label: "Favorite", icon: <FaHeart />, path: "/favorite" },
    { label: "Library", icon: <FaHeadphonesAlt />, path: "/library" },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-black to-gray-900 text-white fixed flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center justify-center mb-10">
        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-xl font-bold">Shubh</h1>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-6">
        {navItems.map((item, idx) => (
          <Link
            to={item.path}
            key={idx}
            className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200 ${
              currentPath === item.path
                ? "bg-red-600 text-white"
                : "hover:bg-red-500 text-gray-300"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-base">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
