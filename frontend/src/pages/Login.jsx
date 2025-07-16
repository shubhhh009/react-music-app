const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back</h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white outline-none"
        />
        <button className="w-full bg-red-500 hover:bg-red-600 p-2 rounded text-white font-semibold">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
