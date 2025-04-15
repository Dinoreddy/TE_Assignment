import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase.js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User created!");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container bg-white border border-gray-600 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-500">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 block w-full bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 block w-full bg-white border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          {/* Link to LogIn Page */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
