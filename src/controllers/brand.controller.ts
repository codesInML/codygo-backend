import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, RequestValidationError } from "../errors";
import { successResponse } from "../helpers";
import {
  createBrandService,
  getABrandService,
  getAllBrandService,
  updateBrandService,
} from "../services";

export const createBrandController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const brand = await createBrandService(name);
  return successResponse(res, StatusCodes.CREATED, brand);
};

export const getAllBrandsController = async (req: Request, res: Response) => {
  const brands = await getAllBrandService();
  return successResponse(res, StatusCodes.OK, brands);
};

export const getABrandController = async (req: Request, res: Response) => {
  const { name } = req.params;
  const brand = await getABrandService(name);

  if (!brand)
    throw new BadRequestError(`Brand with name ${name} does not exist`);

  return successResponse(res, StatusCodes.OK, brand);
};

export const updateBrandController = async (req: Request, res: Response) => {
  const { brandName, name } = req.body;
  let brand = await getABrandService(brandName);

  if (!brand)
    throw new BadRequestError(`Brand with name ${brandName} does not exist`);

  brand = await updateBrandService(brandName, { name });

  return successResponse(res, StatusCodes.CREATED, brand);
};
