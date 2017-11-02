import { Router } from "express";
import apiRoute from "./api.route";

const apiRouter = Router();

apiRouter.use("/", apiRoute);

export { apiRouter };
