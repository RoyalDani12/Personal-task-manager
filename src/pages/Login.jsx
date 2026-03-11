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
  const [ showPassword,setShowPassword ] = useState()
  const [err,setErr ] = useState("")
  const [ success ,setSccess ] = useState('')
  //  handle onchange
  const handleChange=(e)=>{
    
    const { name , value } = e.target
    setData({...data,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()  
    try {
      const response = await loginAPI(data)
      setSccess(response.data.message)
      console.log(response.data.message)
      // save the accessToken to the loocal storage
      localStorage.setItem('accessToken',response.data.accessToken)
      localStorage.setItem('user',JSON.stringify(response.data))
       setTimeout(()=>{
           navigate('/dashboard')
       },2000)
    } catch (error) {
      setErr(error.data.message)
      console.log(error.message);
      
    } 

  }
    
  return (
    <div>
      <Navbar/>
      <div>
        
        <form onSubmit={handleSubmit}>
          {success && <p>{success}</p>}
          {err && <p>{err}</p>}
           <input type="email"
                 name='email'
                 placeholder='Enter Emial'
                 value={data.email}
                 onChange={handleChange}
            />

            <input type={showPassword ?"text" :"password" }
                   name='password'
                   placeholder='Enter Password'
                   value={data.password}
                   onChange={handleChange}
             />
              <button type='button' onClick={()=>setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>

              
             <button type='submit'>Login</button>
             <p>Don't have an account ?<Link to={'/register'}>Create One</Link> </p>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Login
