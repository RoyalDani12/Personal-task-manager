import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import registerUserAPI from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState();
  const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);
    const register = async () => {
      try {
        setError("");
        const response = await registerUserAPI(data);
        setSuccess(
          response.data.message || "Login Successfully You Can Login Now ",
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        if (error.response.data.message) {
          setError(error.response.data.message);
          console.log(error.response.data.message);
        } else setError("Some thing went wrong...");
      }
    };

    register();
  };

  return (
    <div className="min-h-screen bg-[#0E0F13] text-indigo-500 flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 py-12 animation-float">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800/60 rounded-xl shadow-2xl p-10 relative overflow-hidden animate-float">
          {/* TITLE */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-600">Register</h2>
            {success && (
              <div className="bg-[#00B464]/10 border border-[#00B464]/30 text-[#00B464] px-4 py-3 rounded-xl text-xs font-bold text-center animate-pulse">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-4 rounded-xl text-xs font-bold text-center animate-pulse">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* USERNAME */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-indigo-500 ml-1">
                Username
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter username"
                value={data.name}
                onChange={handleChange}
                className="w-full bg-[#0E0F13] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 transition-all placeholder:text-slate-400 font-mono"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-indigo-500 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@domain.com"
                value={data.email}
                onChange={handleChange}
                className="w-full bg-[#0E0F13] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 transition-all placeholder:text-slate-400 font-mono"
              />
            </div>
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-indigo-500 ml-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={data.phone}
                onChange={handleChange}
                className="w-full bg-[#0E0F13] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 transition-all placeholder:text-slate-400 font-mono"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-indigo-500 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={data.password}
                onChange={handleChange}
                className="w-full bg-[#0E0F13] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 transition-all placeholder:text-slate-400 font-mono"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-indigo-500 ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#0E0F13] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 transition-all placeholder:text-slate-400 font-mono"
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-green-500 cursor-pointer text-white py-4 rounded-xl font-black transition-all active:scale-[0.98]"
            >
              Register
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-indigo-500 text-[13px] font-bold pt-4">
              Already have an account?
              <Link
                to="/login"
                className="ml-2 hover:text-green-600 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
