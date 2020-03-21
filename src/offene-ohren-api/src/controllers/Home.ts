import {Express, Request, Response} from 'express'
import { Controller } from './Controller'

export class Home extends Controller{

    constructor(app: Express){
        super(app, "/home")
    }

    Get(request: Request, response: Response): void {
        response.status(200)
        .send({status: 'success'})
    }
    Post(request: Request, response: Response): void {
        throw new Error("Method not implemented.")
    }
    Put(request: Request, response: Response): void {
        throw new Error("Method not implemented.")
    }
    Delete(request: Request, response: Response): void {
        throw new Error("Method not implemented.")
    }
}