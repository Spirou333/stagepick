import { Router } from "express";
import {
  createApplication,
  getApplicationById,
  listApplications,
  updateApplication,
  deleteApplication,
} from "../../controllers/application.controller";

const router = Router();

router.get("/", listApplications);
router.post("/", createApplication);
router.get("/:applicationId", getApplicationById);
router.patch("/:applicationId", updateApplication);
router.delete("/:applicationId", deleteApplication);

export default router;