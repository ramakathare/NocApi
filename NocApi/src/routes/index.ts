import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import modelRoute from "./model.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/models", modelRoute);

export { router };
