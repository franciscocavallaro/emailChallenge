import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import router from "./router/Router";
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../swagger/swagger_output.json';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

const server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

export default server;