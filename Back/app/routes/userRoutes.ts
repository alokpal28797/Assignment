import express from 'express';
import usercontroller from '../Controller/usercontroller';
import { createUserValidationRules, loginValidationRules } from '../helpers/validators';
import UserAuthorization from '../Middleware/Authentication/Authentication'

const userRoute = express()

userRoute.post('/register' ,createUserValidationRules , usercontroller.registerUser)
userRoute.post('/login' ,loginValidationRules , usercontroller.loginUser)
userRoute.get('/getUserTask',UserAuthorization.userAuth , usercontroller.getUserTask)


export default userRoute