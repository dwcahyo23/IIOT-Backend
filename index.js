import express from "express";
import cors from "cors";
import AuthRouter from "./router/AuthRouter.js";

const port = 5000
const app = express();
app.use(cors());
app.use(express.json());
app.use(AuthRouter);


app.listen(port,()=>console.log(`Server up & running in ${port}`))