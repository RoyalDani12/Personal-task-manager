import express from 'express'
 const router = express.Router()
 import registerController from './controller/register.controller.js'
 import loginController from './controller/login.controller.js'
 import refreshController from './controller/refresh.controller.js'
 import googleLoginController from './controller/google.login.controller.js'
 import { loginValidator } from './validators/login.validator.js'
 import { registerValidator } from './validators/register.validator.js'
 



 //login and register router
 router.post('/register',registerValidator,registerController)
 router.post('/login',loginValidator,loginController)
 router.post('/refresh-token',refreshController)
 router.post('/google-login',googleLoginController)

 

 export default router