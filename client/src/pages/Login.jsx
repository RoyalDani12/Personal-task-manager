import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginAPI } from "../api/authApi";
import { GoogleLogin } from "@react-oauth/google";
import { googleLoginAPI } from "../api/google.login.api";
import { loginSchema } from "../validators/login.validator";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (err) setErr(""); // Clear error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    const { error } = loginSchema.validate(data, { abortEarly: false });
    if (error) {
      setErr(error.message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginAPI(data);
      setSuccess("Login Successfully. Redirecting...");
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data));

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setErr(error.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const response = await googleLoginAPI(token);
      setSuccess("Google login successfully");
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data));
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("google auth error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans antialiased">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md border border-gray-200 rounded-xl shadow-2xl p-10 relative overflow-hidden bg-white">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-black">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {success && (
              <div className="bg-green-100 text-green-600 px-4 py-3 rounded-xl text-xs font-bold text-center animate-pulse">
                {success}
              </div>
            )}

            {err && (
              <div className="bg-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold text-center">
                {err}
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-black ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@domain.com"
                value={data.email}
                onChange={handleChange}
                className={`w-full bg-white border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-gray-400 font-mono ${
                  err.toLowerCase().includes("email")
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-black ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all placeholder:text-gray-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 cursor-pointer disabled:opacity-50 text-white py-4 rounded-xl font-black transition-all active:scale-[0.98] shadow-lg shadow-gray-300/10 mt-2"
            >
              Login
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute w-full border-t border-gray-300"></div>
              <span className="relative bg-white px-4 text-[14px] font-black text-gray-500 uppercase">
                OR
              </span>
            </div>

            {/* GOOGLE LOGIN */}
            <div className="flex justify-center bg-black">
              <div className="w-full overflow-hidden  transition-colors">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  theme="filled_black"
                  shape="rectangle"
                  width="360px"
                  text="signin_with"
                />
              </div>
            </div>

            {/* REGISTER LINK */}
            <p className="text-center text-black text-[13px] font-bold pt-4">
              Don't have Account?
              <Link
                to={"/register"}
                className="text-black hover:text-gray-700 ml-2 transition-colors"
              >
                Create One
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;