import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
  {
      name:{
        type:String,
        required:true,
        trim:true,
      },

      email:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        unique:true,
      },

      phone:{
        type:String,
        required:true,
      },

      password:{
        type:String,
        required:true,
        minlength:8,
        select:false  // important for security means by default mongoose is not return password filed in quires
                      // unless we can tell explicitly
      },

    role:{
      type:String,
      enum:['admin','user','superadmin'],
      default:"user"
    },

    avater:{
    type:String,
    },

    isActive: {
      type:Boolean,
      default:true,
    },

    isVerified: {
      type:Boolean
    },

    lastLogin: {
      type:Date,
    } ,
    refreshToken: {
      type:String
    }   // additional data

},{ timestamps:true })


const User = mongoose.model('User',userSchema)

export default User