import express from 'express';
import userRoute from './userRoutes';
import taskRoute from './taskRoutes';
import UserAuthorization from '../Middleware/Authentication/Authentication'

const route = express.Router()

route.use('/user'  , userRoute)
route.use('/task' , taskRoute)

export default route