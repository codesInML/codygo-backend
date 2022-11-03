import { Router } from "express";
import {
  createHotelController,
  deleteHotelController,
  getAllHotelController,
  getHotelController,
  updateHotelController,
} from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { hotelImagesUploader } from "../middleware";
import { createHotelSchema, updateHotelSchema } from "../schema";

const router = Router();

router
  .route("/")
  .post(
    hotelImagesUploader(),
    createHotelSchema(),
    validateRequestMiddleware,
    createHotelController
  )
  .get(getAllHotelController);

router
  .route("/:hotelID")
  .get(getHotelController)
  .patch(updateHotelSchema(), validateRequestMiddleware, updateHotelController)
  .delete(deleteHotelController);

export { router as hotelRoutes };
