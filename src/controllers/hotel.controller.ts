import { Brand, Hotel } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { successResponse } from "../helpers";
import { findBrandByID } from "../services";
import { createHotelService } from "../services/hotel.service";

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
