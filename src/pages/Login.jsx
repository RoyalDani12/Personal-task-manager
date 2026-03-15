import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { loginAPI } from '../api/authApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [data,setData] = useState({
    email:"",
    password:""
  })

  const [showPassword,setShowPassword] = useState()
  const [err,setErr] = useState("")
  const [success,setSccess] = useState('')

  const handleChange=(e)=>{
    const { name , value } = e.target
    setData({...data,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {

      const response = await loginAPI(data)

      setSccess(response.data.message)

      localStorage.setItem('accessToken',response.data.accessToken)
      localStorage.setItem('user',JSON.stringify(response.data))

      setTimeout(()=>{
        navigate('/dashboard')
      },1000)

    } catch (error) {

      setErr(error.data.message)
      console.log(error.message)

    }

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Navbar/>

      {/* LOGIN SECTION */}

      <div className="flex flex-1 items-center justify-center px-6 py-16">

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-slate-400 mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {success && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {err && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {err}
              </div>
            )}

            {/* EMAIL */}

            <div>

              <label className="text-sm text-slate-400 block mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition"
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label className="text-sm text-slate-400 block mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" :"password"}
                  name="password"
                  placeholder="Enter Password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-indigo-500 transition"
                />

                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-lg font-semibold"
            >
              Login
            </button>


            {/* REGISTER */}

            <p className="text-center text-slate-400 text-sm">
              Don't have an account ?
              <Link
                to={'/register'}
                className="text-indigo-400 hover:text-indigo-300 ml-1"
              >
                Create One
              </Link>
            </p>

          </form>

        </div>

      </div>

      <Footer/>

    </div>

  )
}

export default Login