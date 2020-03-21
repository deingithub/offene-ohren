import express from 'express'
import compress from 'compression'
import cors from 'cors'

import controllers from './controllers'

const app = express()

app.use(compress())
app.use(cors())

const registeredControllers = controllers.map(x => new x(app))
    .forEach(x => console.log(`Registered Controller ${x.GetRoute()}`))

app.get('*', (req, res) => res.status(404).send("Nothing found here"))
app.listen(8000, () => console.log("Listening on port "))