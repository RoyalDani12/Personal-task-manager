import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetAPI } from "../api/resetApi";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success,setSuccess]  = useState("")
  

  const [searchParams] = useSearchParams()
   const token  = searchParams.get('token')
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
       console.log("password don't match");
      
    }

    setLoading(true);

    try {
       
      const response = await resetAPI(password ,confirmPassword ,token) 
       console.log(response.data);
        setSuccess(response.data.message)
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fafafa] text-black p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Create New Password</h2>
          <p className="mt-2 text-sm text-gray-500">
            Ensure your new password is at least 8 characters long and strong.
          </p>
        </div>

        {/* Status Notification */}
        {success && (
          <div className={`w-full p-3 mb-6 text-sm rounded-xl text-center border ${
            success ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"
          }`}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
              New Password
            </label>
            <div className="relative">
              <input
                required
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
              Confirm Password
            </label>
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="group relative flex w-full justify-center items-center rounded-xl bg-black px-3 py-4 text-sm font-semibold text-white hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:bg-gray-400 mt-4 h-12"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Update Password"
            )}
          </button>

          {/* Footer Link */}
          <div className="text-center pt-2">
            <button 
              type="button"
              className="text-xs font-medium text-gray-500 hover:text-black transition-all"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;