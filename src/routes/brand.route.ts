import { Router } from "express";
import {
  createBrandController,
  getABrandController,
  getAllBrandsController,
  updateBrandController,
} from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { createBrandSchema, updateBrandSchema } from "../schema/brand.schema";

const router = Router();

router
  .route("/")
  .post(createBrandSchema(), validateRequestMiddleware, createBrandController)
  .get(getAllBrandsController)
  .patch(updateBrandSchema(), validateRequestMiddleware, updateBrandController);

router.route("/:name").get(getABrandController);

export { router as brandRoutes };
