import { Brand, Hotel } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { deleteUpload, successResponse } from "../helpers";
import { uploadPublicImage } from "../middleware";
import {
  createHotelService,
  deleteHotelService,
  findBrandByID,
  findHotelByID,
  getAllHotelService,
  updateHotelService,
} from "../services";

export const createHotelController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, city, country, address, ratings, price, brandID } = req.body;

  let featuredImage: { image: string; isMain: boolean };
  let otherImages: { image: string; isMain: boolean }[];
  let files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // check that files are present
  if (
    !Object.keys(files).includes("featuredImage") &&
    !Object.keys(files).includes("otherImages")
  )
    throw new BadRequestError("Please provide the images");
  if (!Object.keys(files).includes("featuredImage")) {
    files["otherImages"].map((image) => {
      deleteUpload(image.path, next);
    });
    throw new BadRequestError("Please provide a featured image");
  }
  if (!Object.keys(files).includes("otherImages")) {
    deleteUpload(files["featuredImage"][0].path, next);
    throw new BadRequestError("Please provide other images");
  }

  // upload files to S3 and format to be saved in DB
  featuredImage = {
    image:
      process.env.AWS_PUBLIC_CATEGORY! +
      "/" +
      files["featuredImage"][0].filename,
    isMain: true,
  };
  await uploadPublicImage(files["featuredImage"][0]);
  deleteUpload(files["featuredImage"][0].path, next);

  otherImages = files["otherImages"].map(
    (image): { image: string; isMain: boolean } => {
      uploadPublicImage(image).then(() => {
        deleteUpload(image.path, next);
      });
      return {
        image: process.env.AWS_PUBLIC_CATEGORY! + "/" + image.filename,
        isMain: false,
      };
    }
  );

  const images = [featuredImage, ...otherImages];

  let brand: Brand | null;
  let hotel: Hotel;

  if (brandID) {
    brand = await findBrandByID(brandID);

    if (!brand) throw new BadRequestError(`Invalid brand ID`);

    hotel = await createHotelService(
      { name, city, country, address, ratings, price },
      images,
      brand.id
    );
  } else {
    hotel = await createHotelService(
      {
        name,
        city,
        country,
        address,
        ratings,
        price,
      },
      images
    );
  }

  return successResponse(res, StatusCodes.CREATED, hotel);
};

export const getAllHotelController = async (req: Request, res: Response) => {
  const { page = 1, limit = 100, orderBy } = req.query;
  const skip = (+page - 1) * +limit;
  let data: {
    hotels: Hotel[];
    totalPages: number;
  };

  if (orderBy == "price" || orderBy == "ratings") {
    data = await getAllHotelService(skip, +limit, orderBy);
  } else {
    data = await getAllHotelService(skip, +limit);
  }

  return successResponse(res, StatusCodes.OK, { ...data, currentPage: +page });
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
