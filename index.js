/* eslint-disable no-underscore-dangle */
import path from 'path';
import { fileURLToPath } from 'url';

import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
// console.log(`dirname: ${path.join(__dirname, '../.env')}`);
import express from 'express';
import cors from 'cors';
import AuthRouter from './router/AuthRouter.js';
import MachineRouter from './router/MachineRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const corsOptions = {
  origin: 'http://localhost:3000', // ini IP frontendmu
  optionsSuccessStatus: 200,
};

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(AuthRouter);
app.use(MachineRouter);

app.listen(port, () => console.log(`Server up & running in ${port}`));
