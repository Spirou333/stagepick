import { Router } from "express";
import {
  addGenre,
  listGenres,
  deleteGenre
} from "../../controllers/genre.controller";

const router = Router();

router.get("/", listGenres);
router.post("/", addGenre);
router.delete("/:genreId", deleteGenre);

export default router;