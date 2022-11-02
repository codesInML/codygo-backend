import { Router } from "express";
import { createHotelController } from "../controllers/hotel.controller";
import { validateRequestMiddleware } from "../helpers";
import { createHotelSchema } from "../schema/hotel.schema";

const router = Router();

router
  .route("/")
  .post(createHotelSchema(), validateRequestMiddleware, createHotelController);

export { router as hotelRoutes };
