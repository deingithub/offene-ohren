import { Express, Request, Response } from 'express'
import { getConnection } from 'typeorm';
import { QueuedTalk, Helper, CWTopics } from 'offene-ohren';

import { Controller, GetAuthenticatedUser } from './Controller'

export class Queue extends Controller {

    constructor(app: Express) {
        super(app, "/queue")
    }

    async Get(request: Request, response: Response): Promise<void> {
        const me = await GetAuthenticatedUser(request).catch(() => {
            response.status(401);
            response.json({ status: "unauthorized" });
            return null;
        });
        if (!me) { return; }
        const helperData = await getConnection().getRepository(Helper).findOne({ user: me });
        if (helperData == null || helperData == undefined) {
            response.status(401);
            response.json({ status: "unauthorized" });
            return;
        }
        const res = await getConnection().getRepository(QueuedTalk)
            .createQueryBuilder("qt")
            .where("not qt.requester = :rq and not qt.cws = any(:filters)", { rq: me.uid, filters: helperData.filters })
            .limit(50)
            .leftJoin("qt.requester", "requester")
            .select(["qt.cws", "qt.severity", "qt.createdAt", "requester.nick", "requester.bio"])
            .orderBy("qt.createdAt", "ASC")
            .getMany();
        response.status(200);
        response.json({ status: "success", data: res })
    }

    async Post(request: Request, response: Response): Promise<void> {
        const me = await GetAuthenticatedUser(request).catch(() => {
            response.status(401);
            response.json({ status: "unauthorized" });
            return null;
        });
        if (!me) { return; }
        const newtalk = getConnection().getRepository(QueuedTalk).create(
            {
                requester: me,
                severity: request.body["severity"],
                cws: request.body["cws"].map((x: string) => <CWTopics>x),
            }
        );
        getConnection().getRepository(QueuedTalk).save(newtalk);
        response.status(200);
        response.json({ status: "success" });
    }

    Put(request: Request, response: Response): void {
        throw new Error("Method not implemented.")
    }

    async Delete(request: Request, response: Response): Promise<void> {
        const me = await GetAuthenticatedUser(request).catch(() => {
            response.status(401);
            response.json({ status: "unauthorized" });
            return null;
        });
        if (!me) { return; }
        await getConnection().getRepository(QueuedTalk).delete({ requester: me });
        response.status(200);
        response.json({ status: "success" });
    }
}