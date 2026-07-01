import { Router } from "express";
import applicationsRouter from "./application.route";
import genreRouter from "./genre.route";

const router = Router();

router.use("/applications", applicationsRouter);
router.use("/genres", genreRouter);

export default router;