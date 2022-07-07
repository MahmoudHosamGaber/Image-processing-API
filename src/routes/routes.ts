import { Router } from "express";
const router = Router();
import convertImage from "../controllers/convertController";
router.get("/convert", convertImage);

export default router;
