import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../helpers";
import {
  createBrandService,
  getABrandService,
  getAllBrandService,
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
  return successResponse(res, StatusCodes.OK, brand);
};
