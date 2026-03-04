import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

const connectDB= expressAsyncHandler( async()=>{
  
    const Conncte = await mongoose.connect(process.env.MONGO_URL)
      if(Conncte)
        console.log('Database connected succefully')

} )


export default connectDB