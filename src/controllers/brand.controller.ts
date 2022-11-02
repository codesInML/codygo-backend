import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../helpers";
import { createBrandService } from "../services";

export const createBrandController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const brand = await createBrandService(name);
  return successResponse(res, StatusCodes.CREATED, brand);
};
