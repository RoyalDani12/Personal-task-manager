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


  // handle change
  const handleChange=(e)=>{
    const { name,value } = e.target
     setData({...data,[name]:value})
  }



  // handle submit
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
    <div>
      <Navbar/>
      <div>
        { err && <p>{err}</p>}
        { success && <p>{success}</p>}
        <form onSubmit={handleSubmit} > 
            <div>
              <h1>Sigh up</h1>
            </div>
           <input type="text"
                  name='name'
                  value={data.name}
                  placeholder='Enter Name'
                  onChange={handleChange}
            />
           <input type="email"
                  name='email'
                  value={data.email}
                  placeholder='Enter Email'
                  onChange={handleChange}
            />
            <input type="tel"
                  name='phone'
                  value={data.phone}
                  placeholder='Enter Name'
                  onChange={handleChange}
            />
           <input type={showPassword ? "text":"password"}
                  name='password'
                  value={data.password}
                  placeholder='Enter Password'
                  onChange={handleChange}
            />  
              <button type='button' onClick={()=>setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ?faEyeSlash : faEye}/>
              </button>
           <input type={showConfirm ?"text" :"password"}
                  name='confirmPassword'
                  value={data.confirmPassword}
                  placeholder='Confirm Password'
                  onChange={handleChange}
            />
             <button type='button' onClick={()=>setConfirmPassword(!showConfirm)}>
                  <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye}/>
            </button>
             <div>
                <input type="checkbox" />
                <label> Agree to the Terms and Policys</label>
             </div>

            <button type='submit'>Rgister</button>
            <p>Alerady has one?<Link to={'/login'}>Login</Link></p>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Register
