import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const storedData = localStorage.getItem("libraryUser");

    if (!storedData) {
      setError("No account found. Please create an account.");
      return;
    }

    const user = JSON.parse(storedData);

    if (email === user.email && password === user.password) {
      login();                 // AuthContext login
      navigate("/");           // go to home
      return;
    }

    setError("Invalid email or password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-linear-to-br from-blue-100 via-purple-100 to-pink-100
                    animate-[gradientShift_8s_ease_infinite]">
      
      <div className="bg-white/40 backdrop-blur-lg shadow-2xl rounded-2xl 
                      p-8 w-full max-w-md border border-white/30 
                      transition-transform hover:scale-[1.03]">

        <h1 className="text-4xl font-extrabold text-center mb-6 
                       text-blue-700 drop-shadow">
          📚 Library System
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         bg-white/70 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         bg-white/70 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg 
                       hover:bg-blue-800 hover:scale-105 
                       transition-all shadow-md"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-700 mt-3">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}
