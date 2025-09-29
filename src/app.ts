import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerModule from './config/swagger'
import userModule from './presentation/user'
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(swaggerModule)
app.use(userModule);

export default app;