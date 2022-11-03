import { Brand, Hotel } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { successResponse } from "../helpers";
import {
  createHotelService,
  deleteHotelService,
  findBrandByID,
  findHotelByID,
  getAllHotelService,
  updateHotelService,
} from "../services";

export const createHotelController = async (req: Request, res: Response) => {
  const { name, city, country, address, ratings, price, brandID } = req.body;

  let brand: Brand | null;
  let hotel: Hotel;

  if (brandID) {
    brand = await findBrandByID(brandID);

    if (!brand) throw new BadRequestError(`Invalid brand ID`);

    hotel = await createHotelService(
      { name, city, country, address, ratings, price },
      brand.id
    );
  } else {
    hotel = await createHotelService({
      name,
      city,
      country,
      address,
      ratings,
      price,
    });
  }

  return successResponse(res, StatusCodes.CREATED, hotel);
};

export const getAllHotelController = async (req: Request, res: Response) => {
  const hotels = await getAllHotelService();
  return successResponse(res, StatusCodes.OK, hotels);
};

export const getHotelController = async (req: Request, res: Response) => {
  const { hotelID } = req.params;

  const hotel = await findHotelByID(hotelID);

  if (!hotel) throw new BadRequestError("Invalid hotel ID");

  return successResponse(res, StatusCodes.OK, hotel);
};

export const updateHotelController = async (req: Request, res: Response) => {
  const { hotelID } = req.params;
  const { name, city, country, address, ratings, price, brandID } = req.body;

  let hotel = await findHotelByID(hotelID);

  if (!hotel) throw new BadRequestError("Invalid hotel ID");

  hotel = await updateHotelService(
    { name, city, country, address, ratings, price, brandID },
    hotelID
  );
  return successResponse(res, StatusCodes.CREATED, hotel);
};

export const deleteHotelController = async (req: Request, res: Response) => {
  const { hotelID } = req.params;

  let hotel = await findHotelByID(hotelID);

  if (!hotel) throw new BadRequestError("Invalid hotel ID");

  await deleteHotelService(hotelID);
  return successResponse(res, StatusCodes.OK);
};
