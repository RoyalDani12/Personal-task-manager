import React from "react"
import { BrowserRouter,Routes,Route }  from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import TaskDetail from "./components/dashboardComponent/TaskDetail"
// import addTask from "./api/addTask"
import AddTask from "./components/dashboardComponent/AddTask"

function App() {


  return (
     <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/task-detail" element={<TaskDetail/>}></Route>
          <Route path="/create-task" element={<AddTask/>}></Route>
       </Routes>
      </BrowserRouter>
     </div>
  )
}

export default App
