import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import taskRepository from "../Repository/taskRepository";
import { DefaultResponse } from "../helpers/defaultResponse.";


class TaskController {
    async createTask(req: Request, res: Response, next: NextFunction) {
        console.log("sgakgeukgfq");
        try {
            const data = req.body
            console.log("🚀 ~ file: taskController.ts:11 ~ TaskController ~ createTask ~ data:", data)
            const idFromToken = (req as any).UId
            data.id = idFromToken
            // to handle errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const response = await taskRepository.createTask(data)
            DefaultResponse(res, 200, "Task Create successfully", response)
        } catch (error) {
            console.log("🚀 ~ file: taskController.ts:9 ~ TaskController ~ createTask ~ error:", error)

        }
    }

    async getTask(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.body.email;
            const response = await taskRepository.getTask(id)
            DefaultResponse(res, 200, "Task fetched successfully", response)
        } catch (error) {
            console.log("🚀 ~ file: taskController.ts:9 ~ TaskController ~ createTask ~ error:", error)

        }
    }

    // to delete a task

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            console.log((req as any).role, '(req as any).role')
            if ((req as any).role === "admin") {
                const id = req.params.id;
                console.log("🚀 ~ file: taskController.ts:42 ~ TaskController ~ deleteTask ~ id:", id)

                const response = await taskRepository.deleteTask(id)
                DefaultResponse(res, 200, "Task deleted successfully", response)
            }
            else{
                DefaultResponse(res, 401, "You are not Authorized")
            }


        } catch (error: any) {
            console.log("🚀 ~ file: taskController.ts:43 ~ TaskController ~ deleteTask ~ error:", error)
            res.send(error?.data)
        }
    }

    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, title, description, userId } = req.body
            console.log("🚀 ~ file: taskController.ts:42 ~ TaskController ~ deleteTask ~ id:", id)
            const data = {
                title: title,
                description: description,
                userId: userId
            }
            console.log("🚀 ~ file: taskController.ts:61 ~ TaskController ~ updateTask ~ data:", data)
            const response = await taskRepository.updateTask(id, data)
            console.log("🚀 ~ file: taskController.ts:67 ~ TaskController ~ updateTask ~ response:", response)
            DefaultResponse(res, 200, "Task Updated successfully", response)

        } catch (error: any) {
            console.log("🚀 ~ file: taskController.ts:43 ~ TaskController ~ deleteTask ~ error:", error)
            res.send(error?.data)
        }
    }
}

export default new TaskController()