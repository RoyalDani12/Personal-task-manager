import express from 'express'
 const router = express.Router()
 import registerController from './controller/register.controller.js'
 import loginController from './controller/login.controller.js'
 import refreshController from './controller/refresh.controller.js'



 //login and register router
 router.post('/register',registerController)
 router.post('/login',loginController)
 router.post('/refresh-token',refreshController)

 
// remmber  you don't save to the local storage and database refresh token 

 export default router