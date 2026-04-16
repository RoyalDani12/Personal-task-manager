import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotApi from "../api/forgot.api";
import { forgotSchema } from "../validators/forgot.pass.validator";

const ForgotPassword = () => {
  const [userEmail, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setError] = useState(""); // Added error handling UI
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");

    
    
    try {

      const { error }  =  forgotSchema.validate(userEmail,{
        abortEarly:false,
        errors :{
          wrap:{
            label:""
          }
        }
      })

      if(error){
        setError(error.details[0].message)
        setIsLoading(false)
        console.log(err);
        return
      }
      const forgotResponse = await forgotApi(userEmail);
      setSuccess(forgotResponse.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fafafa]">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center w-full mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-gray-500 mt-2 text-sm px-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="w-full p-3 mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl text-center animate-pulse">
            {success}
          </div>
        )}

        {err && (
          <div className="w-full p-3 mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <input
              name="email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
              className="w-full p-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white font-medium rounded-xl w-full h-12 flex justify-center items-center gap-2 hover:bg-zinc-800 transition-colors active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <button
              onClick={() => navigate("/login")}
              type="button"
              className="text-gray-600 text-sm font-medium hover:text-black transition-colors py-2"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;