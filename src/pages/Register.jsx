import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import registerUserAPI from '../api/authApi'

const Register = () => {

  const [data ,setData ] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    confirmPassword:"",
  })

  const [ showPassword,setShowPassword] = useState(false)
  const [ showConfirm ,setConfirmPassword] = useState(false)

  const [err,setErr] = useState('')
  const [success,setSccess ] = useState('')
  const [ loading ,setLoading ] = useState(false)

  const handleChange=(e)=>{
    const { name,value } = e.target
     setData({...data,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
      try {
        const response = await registerUserAPI(data)
         setSccess(response.data.message || " user register succefully")
      } catch (error) {
        const errorMsg = error.response.data.message || 'Something went wrong'
        setErr(errorMsg)
        console.log(errorMsg);
      }finally{
         setLoading(false)
      }
  }

  return (

    <div className="min-h-screen flex flex-col bg-slate-950 text-white">

      <Navbar/>

      <div className="flex flex-1 items-center justify-center px-6 py-16">

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-10">

          { err && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {err}
            </div>
          )}

          { success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-slate-400 text-sm mt-1">Create your account</p>
            </div>

            <input
              type="text"
              name='name'
              value={data.name}
              placeholder='Enter Name'
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition"
            />

            <input
              type="email"
              name='email'
              value={data.email}
              placeholder='Enter Email'
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition"
            />

            <input
              type="tel"
              name='phone'
              value={data.phone}
              placeholder='Enter Name'
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition"
            />

            {/* Password */}

            <div className="relative">

              <input
                type={showPassword ? "text":"password"}
                name='password'
                value={data.password}
                placeholder='Enter Password'
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-indigo-500 transition"
              />

              <button
                type='button'
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <FontAwesomeIcon icon={showPassword ?faEyeSlash : faEye}/>
              </button>

            </div>

            {/* Confirm Password */}

            <div className="relative">

              <input
                type={showConfirm ?"text" :"password"}
                name='confirmPassword'
                value={data.confirmPassword}
                placeholder='Confirm Password'
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-indigo-500 transition"
              />

              <button
                type='button'
                onClick={()=>setConfirmPassword(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye}/>
              </button>

            </div>

            {/* Terms */}

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" className="accent-indigo-500"/>
              <label>Agree to the Terms and Policys</label>
            </div>

            <button
              type='submit'
              className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-lg font-semibold"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-slate-400 text-sm">
              Alerady has one?
              <Link to={'/login'} className="text-indigo-400 hover:text-indigo-300 ml-1">
                Login
              </Link>
            </p>

          </form>

        </div>

      </div>

      <Footer/>

    </div>
  )
}

export default Register