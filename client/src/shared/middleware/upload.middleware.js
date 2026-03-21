
import multer from  'multer'
import path from 'path'


// setup  storage
const storage = multer.diskStorage({


   destination:(req,file,cb)=>{
    cb(null,'uploads')
   },

   filename:(req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`)
   }

})

const fileFilter =(req,file,cb)=>{
  if(file.mimetype.startsWith('image/')){
    cb(null,true)
  }else{
    cb(new Error('Only Image files allowed !!'))
  }
}

 export const uplaod =multer({
  storage,
  fileFilter,
  limits:{ fileSize: 1024*1024*2 } 
  // the file size must be Not more that 2 MB
})



