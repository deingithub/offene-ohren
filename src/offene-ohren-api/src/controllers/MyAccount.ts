import { Express, Request, Response } from 'express'
import { Controller, GetAuthenticatedUser } from './Controller'
import { getConnection, FindConditions } from 'typeorm';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { User, Helper, HelperContact, UserBlock } from 'offene-ohren';

export class MyAccount extends Controller {

    constructor(app: Express) {
        super(app, "/my-account")
    }

    // Get current account, requires token
    async Get(request: Request, response: Response): Promise<void> {
        const me = await GetAuthenticatedUser(request).catch(() => {
            response.status(401);
            response.json({ status: "unauthorized" });
            return null;
        });
        if (!me) { return; }
        delete me.apiToken;
        delete me.password;
        delete me.salt;
        delete me.iterations;
        response.status(200).json(me);
    }

    // Update your account, params whatever you want to change [TODO]
    Post(request: Request, response: Response): void {
        throw new Error("Method not implemented.")
    }

    // Create new account, params {email, password, bio, nick}
    async Put(request: Request, response: Response): Promise<void> {
        // TODO Verify contact details
        // TODO sanitize input lengths
        const salt = randomBytes(32).toString("hex");
        const apiToken = randomBytes(32).toString("base64");
        const newme = getConnection().getRepository(User).create({
            email: request.body["email"],
            apiToken: apiToken,
            salt: salt,
            iterations: 10_000,
            bio: request.body["bio"],
            nick: request.body["nick"],
            password: pbkdf2Sync(request.body["password"], salt, 10_000, 64, "sha512").toString("hex")
        });
        getConnection().getRepository(User).save(newme).catch(() => {
            response.status(400).json({ status: "error", data: "insert failure" });
        }).then(() => {
            response.status(200).json({ status: "success", data: apiToken });
        });
    }

    // Delete Account, params {email, password}
    async Delete(request: Request, response: Response): Promise<void> {
        const user = await getConnection().getRepository(User).findOne({
            email: request.body["email"]
        });
        if (user && pbkdf2Sync(request.body["password"], user.salt, user.iterations, 64, "sha512").toString("hex") == user.password) {
            const newuser = getConnection().getRepository(User).create({
                uid: user.uid,
                isDeleted: true,
                apiToken: '',
                bio: '',
                email: '',
                iterations: 0,
                password: '',
                nick: '',
                salt: '',
            });
            await getConnection().getRepository(HelperContact).delete({ helper: { user: user } });
            await getConnection().getRepository(Helper).delete({ user: user });
            await getConnection().getRepository(UserBlock).delete(<FindConditions<UserBlock>>{
                where: [{ blocked: user }, { user: user }]
            });
            await getConnection().getRepository(User).save(newuser);
            response.status(200);
            response.json({ status: "success", data: "goodbye" });
        } else {
            response.status(401);
            response.json({ status: "error", data: "unknown user or password" });
        }
    }
}