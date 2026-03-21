import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { loginAPI } from '../api/authApi'
import { GoogleLogin } from '@react-oauth/google'

const Login = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    if (err) setErr("") // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await loginAPI(data)
      setSuccess("Access Granted. Redirecting...")

      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data))

      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (error) {
      setErr(error.response?.data?.message || "Authentication failed")
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0E0F13] text-[#EAECEF] flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {/* Main Card with Glassmorphism subtle border */}
        <div className="w-full max-w-md bg-[#17181E] border border-slate-800/60 rounded-[2rem] shadow-2xl p-10 relative overflow-hidden">
          
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F7A600]/50 to-transparent"></div>

          <div className="text-center mb-10">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F7A600]/10 mb-4 border border-[#F7A600]/20">
              <FontAwesomeIcon icon={faShieldHalved} className="text-[#F7A600] text-2xl" />
            </div> */}
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
               Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {success && (
              <div className="bg-[#00B464]/10 border border-[#00B464]/30 text-[#00B464] px-4 py-3 rounded-xl text-xs font-bold text-center animate-pulse">
                {success}
              </div>
            )}

            {err && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs font-bold text-center">
                {err}
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-slate-300  ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@domain.com"
                value={data.email}
                onChange={handleChange}
                className="w-full bg-[#0E0F13] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F7A600]/50 transition-all placeholder:text-slate-400 font-mono"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[13px] font-black text-slate-300  ml-1">
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
                  className="w-full bg-[#0E0F13] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F7A600]/50 transition-all placeholder:text-slate-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-[#F7A600] transition-colors"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F7A600] hover:bg-[#ffb700] disabled:opacity-50 text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-[#F7A600]/10 mt-2"
            >
              Login
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute w-full border-t border-slate-800"></div>
              <span className="relative bg-[#17181E] px-4 text-[14px] font-black text-slate-300 uppercase ">
                OR
              </span>
            </div>

            {/* GOOGLE LOGIN CONTAINER */}
            <div className="flex justify-center">
              <div className="w-full overflow-hidden rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                <GoogleLogin
                  onSuccess
                  theme="filled_white"
                  shape="rectangular"
                  width="360px"
                  text="signin_with"
                />
              </div>
            </div>

            {/* REGISTER LINK */}
            <p className="text-center text-slate-300 text-[13px] font-bold  pt-4">
              Don't have Account ? 
              <Link
                to={'/register'}
                className="text-[#F7A600] hover:text-white ml-2 transition-colors"
              >
                Create One
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login