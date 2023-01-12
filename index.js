import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cors from "cors";
import AuthRouter from "./router/AuthRouter.js";
import MachineRouter from "./router/MachineRouter.js"


const corsOptions = {
	origin: 'http://localhost:3000', // ini IP frontendmu
	optionsSuccessStatus: 200
}

const port = 5000
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(AuthRouter);
app.use(MachineRouter);




app.listen(port, () => console.log(`Server up & running in ${port}`))