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

    avatar:{
    type:String,
    default:"https://images.pexels.com/photos/36540591/pexels-photo-36540591.jpeg"
    },

    bio: {
      type: String,
      maxlength: 200,
      default: "Hey there! I'm using the Task Manager."
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





//    addtional taskss we have to add
  // 1, email reminder
  // 2, push notification
  // 3, search and filtter By status,priority, date ranged