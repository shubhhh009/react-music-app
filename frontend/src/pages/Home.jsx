// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black to-gray-900 text-white text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Shubh Music World</h1>
      <p className="text-lg md:text-xl mb-6">Feel the beat. Explore your favorite tunes now.</p>
      <Link to="/login">
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full text-lg transition-all">
          Login to Start
        </button>
      </Link>
    </div>
  );
};

export default Home;
