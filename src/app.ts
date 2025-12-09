import bodyParser from 'body-parser';
import swaggerUi  from 'swagger-ui-express';
import express from 'express'
import cors from "cors"
import routes from './infrastructure/routes'
import { swaggerSpec } from './config/swagger.config'

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes)


export default app
