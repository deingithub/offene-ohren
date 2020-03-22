import { Express, Request, Response } from 'express';
import { Controller } from './Controller';
import { getConnection } from 'typeorm';
import { User } from "offene-ohren";
import { pbkdf2Sync } from "crypto";

export class GetToken extends Controller {

    constructor(app: Express) {
        super(app, "/token")
    }

    // Get token, params {email, password}
    async Post(request: Request, response: Response): Promise<void> {
        const user = await getConnection().getRepository(User).findOne(
            {
                email: request.body["email"]
            }
        );
        if (user && pbkdf2Sync(request.body["password"], user.salt, user.iterations, 64, "sha512").toString("hex") == user.password) {
            response.status(200);
            response.json({ status: "success", data: user.apiToken });
        } else {
            response.status(401);
            response.json({ status: "error", data: "unknown user or password" });
        }
    }
    Get(request: Request, response: Response): void {
        throw new Error("Method not implemented.")
    }
    Put(request: Request, response: Response): void {
        throw new Error("Method not implemented.")
    }
    Delete(request: Request, response: Response): void {
        throw new Error("Method not implemented.")
    }
}