import { Router } from "express";
import { brandRoutes } from "./brand.route";
import { hotelRoutes } from "./hotel.route";

const router = Router();
router.use("/brand", brandRoutes);
router.use("/hotel", hotelRoutes);

export { router as applicationRoutes };
