import { Router } from "express";
import applicationsRouter from "./application.route";

const router = Router();

router.use("/applications", applicationsRouter);

export default router;