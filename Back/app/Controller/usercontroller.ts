import { NextFunction, Request, Response } from "express";
import userRepository from "../Repository/userRepository";
import { DefaultResponse } from './../helpers/defaultResponse.';
import { validationResult } from "express-validator";
import { generateAccessToken } from "../helpers/tokenHelper";
import { comparePassword, hashPassword } from "../helpers/passwordHelper";
import { CustomError } from "../Model/customError";
import cookie from 'cookie';
import session from "express-session";



class UserController {
    //  to create a user 
    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body

            // to handle errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Hash the user's password
            const hashedPassword = await hashPassword(data.password);
            data.password = hashedPassword;


            //  check if user is already existed or not 

            const userExist: any = await userRepository.getUser(data.email)
            console.log("🚀 ~ file: usercontroller.ts:23 ~ UserController ~ createUser ~ userExist:", userExist)

            if (!userExist?.email) {
                //  to create a new user
                const response = await userRepository.addUser(data)

                DefaultResponse(
                    res,
                    200,
                    "User Create successfully",
                    response
                )
            } else {
                DefaultResponse(res, 400, "User already existed ", userExist)
            }
        } catch (error) {
            return error
        }
    }


    //  get user
    async loginUser(req: any, res: Response, next: NextFunction) {
        console.log("in");
        try {
            const data = req.body
            console.log("🚀 ~ file: usercontroller.ts:59 ~ UserController ~ loginUser ~ data:", data)
            // to handle errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const loginResponse: any = await userRepository.getUser(data.email)
            console.log("🚀 ~ file: usercontroller.ts:67 ~ UserController ~ loginUser ~ loginResponse:", loginResponse)

            if (!loginResponse?.email) {
                DefaultResponse(res, 401, "User does not exist");
            }

            const isPasswordValid = await comparePassword(data.password, loginResponse?.password);

            if (!isPasswordValid) {
                DefaultResponse(res, 401, "Invalid credentials")
            }

            // generate access token
            const accessToken = await generateAccessToken({ id: loginResponse.id, email: loginResponse?.email, role: loginResponse.role });

            req.session.accessToken = accessToken;


            DefaultResponse(res, 200, "User fetched successfully", { loginResponse, accessToken })

        } catch (error) {
            console.log("🚀 ~ file: usercontroller.ts:78 ~ UserController ~ loginUser ~ error:", error)
        }
    }

    // get user task

    async getUserTask(req: any, res: Response, next: NextFunction) {
        try {
            const id = req.UId
            console.log("🚀 ~ file: usercontroller.ts:97 ~ UserController ~ getUserTask ~ id:", id)
            const response = await userRepository.getUserTask(id)
            console.log("🚀 ~ file: usercontroller.ts:98 ~ UserController ~ getUserTask ~ response:", response)
            DefaultResponse(res, 200, "User task fetched successfully", response)
        } catch (error) {
            console.log("🚀 ~ file: usercontroller.ts:100 ~ UserController ~ getUserTask ~ error:", error)

        }
    }
}

export default new UserController();