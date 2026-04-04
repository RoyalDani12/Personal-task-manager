import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import registerUserAPI from "../api/authApi";
import { registerSchema } from "../validators/register.validator";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState();
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

    const { error } = registerSchema.validate(data, {
      abortEarly: false,
      errors: {
        wrap: {
          label: " ",
        },
      },
    });

    if (error) {
      const errFunc = {};
      error.details.forEach((err) => {
        const filed = err.path[0];
        errFunc[filed] = err.message;
      });

      setError(errFunc);
      return;
    }

    const register = async () => {
      try {
        setError("");
        const response = await registerUserAPI(data);
        setSuccess(
          response.data.message || "Login Successfully You Can Login Now "
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        if (error.response.data.message) {
          setError(error.response.data.message);
        } else setError("Some thing went wrong...");
      }
    };

    register();
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans gap-20">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-12 py-10">
        {/* RESPONSIVE CONTAINER */}
        <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
          
          {/* TITLE */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">Register</h2>

            {success && (
              <div className="mt-3 bg-green-100 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
                {success}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* GRID (KEY FIX 🔥) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* USERNAME */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-black">Username</label>
                {error && <p className="text-red-600 text-xs">{error.name}</p>}
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm focus:outline-none ${
                    error.name
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-black"
                  }`}
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-black">Email</label>
                {error && <p className="text-red-600 text-xs">{error.email}</p>}
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm focus:outline-none ${
                    error.email
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-black"
                  }`}
                />
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-black">Phone</label>
                {error && <p className="text-red-600 text-xs">{error.phone}</p>}
                <input
                  type="tel"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm focus:outline-none ${
                    error.phone
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-black"
                  }`}
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-black">Password</label>
                {error && <p className="text-red-600 text-xs">{error.password}</p>}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none ${
                    error.password
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-black"
                  }`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold text-black">
                  Confirm Password
                </label>
                {error && (
                  <p className="text-red-600 text-xs">
                    {error.confirmPassword}
                  </p>
                )}
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none ${
                    error.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-black"
                  }`}
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
            >
              Register
            </button>

            {/* LOGIN */}
            <p className="text-center text-black text-sm">
              Already have an account?
              <Link to="/login" className="ml-2 font-semibold underline">
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