import express from "express"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cors from 'cors';
import route from "../app/routes";
import session from "express-session";


dotenv.config()

class Server {
    app: any
    port: any


    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8000
    }

    start() {
        this.app.use(cors())
        console.log("aaa");
        this.app.use(session({ secret: (process.env.ACCESS_TOKEN_SECRET_KEY  as string) }))

        console.log("env port ==>", process.env.PORT)
        console.log(process.env.PORT)
        this.config();
        this.setUp();
        this.listen();

    }

    config() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    setUp() {
        this.app.use(route)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`app is running on Port ${this.port}`);
        })
    }
}

export default Server