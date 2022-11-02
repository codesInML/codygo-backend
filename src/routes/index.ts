import { Router } from "express";
import { brandRoutes } from "./brand.route";

const router = Router();
router.use("/brand", brandRoutes);

export { router as applicationRoutes };
