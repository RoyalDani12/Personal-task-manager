
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext()
// context created

const useAuthContext=({childern})=>{

  const [loading ,setLoading ] =useState(true)
  const [savedUser ,setSavedUser ] = useState(null)

  useEffect(()=>{
    //check localuser
    //
  })
  
   const login=()=>{
    
   }
   const logout=()=>{

   }

}
<AuthContext Provider={loading,savedUser}>
  {loading && childern }
</AuthContext>