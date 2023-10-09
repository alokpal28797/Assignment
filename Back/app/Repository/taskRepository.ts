import { prisma } from "../../prisma"

class TaskRepository {

    async createTask(data: any) {
        console.log("🚀 ~ file: taskRepository.ts:6 ~ TaskRepository ~ createTask ~ data:", data)
        try {
            const responseTask = await prisma.task.create({
                data: {
                    title: data.title,
                    description: data.description,
                    userId: data.id

                }
            })
            return responseTask
        } catch (error) {
            console.log("🚀 ~ file: taskRepository.ts:7 ~ TaskRepository ~ error:", error)

        }
    }
    async getTask(id: any) {
        try {
            const responseTask = await prisma.task.findMany({
                where: {
                    id: id
                }
            })
            return responseTask
        } catch (error) {
            console.log("🚀 ~ file: taskRepository.ts:7 ~ TaskRepository ~ error:", error)

        }
    }


    async deleteTask(id: any) {

        try {
            const deleteTask = await prisma.task.delete({
                where: {
                    id: id
                }
            })
            return deleteTask
        } catch (error) {
            console.log("🚀 ~ file: taskRepository.ts:36 ~ TaskRepository ~ deleteTask ~ error:", error)
            return error

        }
    }

    async updateTask(id: any, data: any) {

        try {
            const updateTask = await prisma.task.update({
                where: {
                    id: id
                }, data: data
            })
            return updateTask
        } catch (error) {
            console.log("🚀 ~ file: taskRepository.ts:36 ~ TaskRepository ~ deleteTask ~ error:", error)
            return error

        }
    }


}

export default new TaskRepository()