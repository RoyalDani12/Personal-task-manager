
import { OAuth2Client } from 'google-auth-library'

// create object
const client =new  OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const googleLoginUseCase=async(userRepository,body)=>{

// console.log("Backend received body:", body);
const token = body?.IdToken || body?.idToken || body?.token
  if(!token){
    throw new Error("Id token messing")
  }
  // const { token } = body


  const verify = await client.verifyIdToken({
    idToken:token,
    audience:process.env.GOOGLE_CLIENT_ID
  }
  )

  const payload = verify.getPayload()
   const { name, email } = payload

  let found =  await userRepository.findUserByEmail(email)

  if(!found){
     
    const userData = {
      name,
      phone:"0937044312",
      email,
      password:Math.random().toString(36).slice(-10)
    }
    found = await userRepository.createUser(userData)
  }


return found

}

export default googleLoginUseCase