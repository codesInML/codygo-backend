import { Router } from "express";
import {
  createBrandController,
  getABrandController,
  getAllBrandsController,
} from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { brandSchema } from "../schema/brand.schema";

const router = Router();

router
  .route("/")
  .post(brandSchema(), validateRequestMiddleware, createBrandController)
  .get(getAllBrandsController);

router.route("/:name").get(getABrandController);

export { router as brandRoutes };
