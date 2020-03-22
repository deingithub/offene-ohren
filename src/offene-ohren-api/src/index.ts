import express from 'express'
import compress from 'compression'
import cors from 'cors'
import { createConnection } from 'typeorm';

import controllers from './controllers'

const db = createConnection().then(() => {

    const app = express()
    const port = 8000;
    app.use(compress())
    app.use(cors())
    app.use(express.json())

    const registeredControllers = controllers.map(x => new x(app))
        .forEach(x => console.log(`Registered Controller ${x.GetRoute()}`))

    app.get('*', (req, res) => res.status(404).send("Nothing found here"))
    app.listen(port, () => console.log(`Listening on port ${port}`))

});
