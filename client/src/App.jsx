import React from "react"
import { BrowserRouter,Routes,Route }  from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import TaskDetail from "./components/dashboardComponent/TaskDetail"
// import addTask from "./api/addTask"
import AddTask from "./components/dashboardComponent/AddTask"
import UpdateTask from "./components/dashboardComponent/UpdateTask"
import ProfilePage from "./pages/profilePage"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

import { useState } from "react"
import { useEffect } from "react"


function App() {
  
   const [ user ,setUser ] = useState(null)

   useEffect(()=>{
        // check the user is logged in 

        const savedUser = localStorage.getItem('user')
        if(savedUser && savedUser !== "undefined"){
         try {
            const parsed = JSON.parse(savedUser);
            const userData = parsed.user || parsed.data || parsed
            setUser(userData)
         } catch (error) {
            console.error("Auth initialization failed",error)
         }
        }
   },[])

  return (
     <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login setUser={setUser}/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/task-detail/:id" element={<TaskDetail/>}></Route>
          <Route path="/create-task" element={<AddTask/>}></Route>
          <Route path="/update/:id" element={<UpdateTask/>}></Route>
          <Route path="/profile-page" element={<ProfilePage/>}> </Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/reset-pass" element={<ResetPassword/>}></Route>
       </Routes>
      </BrowserRouter>
     </div>
  )
}

export default App
