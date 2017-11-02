import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import modelRoute from "./model.route";
import endpointRoute from "./endpoint.route";

const adminRouter = Router();

adminRouter.use("/auth", authRoute);
adminRouter.use("/users", userRoute);
adminRouter.use("/models", modelRoute);
adminRouter.use("/endpoints", endpointRoute);

export { adminRouter };
