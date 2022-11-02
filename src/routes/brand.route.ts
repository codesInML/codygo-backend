import { Router } from "express";
import { createBrandController } from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { brandSchema } from "../schema/brand.schema";

const router = Router();

router
  .route("/")
  .post(brandSchema(), validateRequestMiddleware, createBrandController);

export { router as brandRoutes };
