import { Express, Request, Response } from 'express';
import { User } from 'offene-ohren';
import { getConnection } from 'typeorm';

export abstract class Controller {
    constructor(private app: Express, private route: string) {
        app.route(route)
            .get(this.Get)
            .post(this.Post)
            .put(this.Put)
            .delete(this.Delete)
    }

    abstract Get(request: Request, response: Response): void
    abstract Post(request: Request, response: Response): void
    abstract Put(request: Request, response: Response): void
    abstract Delete(request: Request, response: Response): void

    public GetRoute(): string {
        return this.route
    }

}
export async function GetAuthenticatedUser(request: Request): Promise<User> {
    const user = await getConnection().getRepository(User).findOne({ apiToken: request.get('Authorization') })
    if (user) {
        return Promise.resolve(user);
    } else {
        return Promise.reject();
    }
}