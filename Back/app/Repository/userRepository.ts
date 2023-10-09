import { prisma } from "../../prisma";

class UserRepo {
    // to create user

    async addUser(data: any) {
        try {
            const response = await prisma.user.create({
                data: data
            })
            return response
        } catch (error) {
            return error
        }
    }

    // to get User

    async getUser(email: string) {
        console.log("🚀 ~ file: userRepository.ts:20 ~ UserRepo ~ getUser ~ email:", email)
        try {
            const response = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            console.log("🚀 ~ file: userRepository.ts:26 ~ UserRepo ~ getUser ~ response:", response)
            return response
        } catch (error) {
            return error
        }
    }

    // get task linked with user
    async getUserTask(id: string) {
        try {
            const response = await prisma.user.findFirst({
                where: {
                    id: id
                }, 
                include: {
                    task: true
                }
            })
            return response
        } catch (error) {
            console.log("🚀 ~ file: taskRepository.ts:35 ~ TaskRepository ~ getUserTask ~ error:", error)

        }
    }


}

export default new UserRepo();