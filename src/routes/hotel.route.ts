import { Router } from "express";
import {
  createHotelController,
  deleteHotelController,
  filterHotelByBrandController,
  getAllHotelController,
  getHotelController,
  updateHotelController,
} from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { hotelImagesUploader } from "../middleware";
import {
  createHotelSchema,
  filterHotelByBrandSchema,
  updateHotelSchema,
} from "../schema";

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
  .route("/filter")
  .post(
    filterHotelByBrandSchema(),
    validateRequestMiddleware,
    filterHotelByBrandController
  );

router
  .route("/:hotelID")
  .get(getHotelController)
  .patch(updateHotelSchema(), validateRequestMiddleware, updateHotelController)
  .delete(deleteHotelController);

export { router as hotelRoutes };
