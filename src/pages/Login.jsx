import React, { useState } from 'react'

const Login = () => {

  const [data,setData] = useState({
    email:"",
    password:""
  })

  //  handle onchange
  const handleChange=(e)=>{
    
    const { name , value } = e.target
    setData({...data,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
 
   
     


  }
    
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
           <input type="email"
                 name='email'
                 placeholder='Enter Emial'
                 value={data.email}
                 onChange={handleChange}
            />

            <input type="text"
                   name='password'
                   placeholder='Enter Password'
                   value={data.password}
                   onChange={(e)=>setData(e.target.value)}
             />
             <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
