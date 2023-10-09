import { NextFunction, Request, Response } from "express"
import { AnySchema, Schema } from "yup"


const Validate= (Schema: AnySchema)=>{
    async ( req :Request, res:Response,next : NextFunction)=>{
        try {
            await Schema.validate({

            })
            next()
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

export default Validate