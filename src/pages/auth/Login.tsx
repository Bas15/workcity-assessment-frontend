import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toast";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    // console.log("user after login:", user);
    if (user) {
      showSuccess("Login successful!");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin text-white inline-block mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-sm text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
