import { Router } from "express";
import {
  createHotelController,
  deleteHotelController,
  getAllHotelController,
  getHotelController,
  updateHotelController,
} from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { createHotelSchema, updateHotelSchema } from "../schema";

const router = Router();

router
  .route("/")
  .post(createHotelSchema(), validateRequestMiddleware, createHotelController)
  .get(getAllHotelController);

router
  .route("/:hotelID")
  .get(getHotelController)
  .patch(updateHotelSchema(), validateRequestMiddleware, updateHotelController)
  .delete(deleteHotelController);

export { router as hotelRoutes };
