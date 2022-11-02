import { Router } from "express";
import {
  createHotelController,
  getAllHotelController,
  getHotelController,
} from "../controllers/hotel.controller";
import { validateRequestMiddleware } from "../helpers";
import { createHotelSchema } from "../schema";

const router = Router();

router
  .route("/")
  .post(createHotelSchema(), validateRequestMiddleware, createHotelController)
  .get(getAllHotelController);

router.route("/:hotelID").get(getHotelController);

export { router as hotelRoutes };
