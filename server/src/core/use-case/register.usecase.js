  import expressAsyncHandler from "express-async-handler"
  import bcrypt from 'bcrypt'
  const registerUseCase=expressAsyncHandler(
    async(useData,userRepository)=>{

      const { name ,email,phone ,password,} = useData
      // check the email is unique
      const existeUser = await userRepository.findUserByEmail(email)
      if(existeUser){
        const error = new Error('User Already Exist Please Login')
        error.statusCode = 400;
        throw error
      }
      // if the use is not register hashepassword

      const hashedPassword = await bcrypt.hash(password,10)

      const user = await userRepository.createUser({
        name,
        email,
        password:hashedPassword,
        phone
      })

      return user

    }
  )

  export default registerUseCase