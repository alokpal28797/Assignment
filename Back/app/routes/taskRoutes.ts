import express from 'express';
import taskController from '../Controller/taskController';
import { taskUpdateValidationRules, taskValidationRules } from '../helpers/validators';
import UserAuthorization from '../Middleware/Authentication/Authentication'

const taskRoute = express()

taskRoute.post('/createTask', UserAuthorization.userAuth,taskValidationRules, taskController.createTask)
taskRoute.get('/getTask/:id', UserAuthorization.userAuth, taskController.getTask)
taskRoute.delete('/deleteTask/:id', UserAuthorization.userAuth, taskController.deleteTask)
taskRoute.put('/updateTask', taskUpdateValidationRules, UserAuthorization.userAuth, taskController.updateTask)



export default taskRoute

