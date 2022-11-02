import { Request, Response } from "express";
import Logger from "../logger";

export const successResponse = (
  res: Response,
  statusCode: number,
  data?: any
) => {
  return res.status(statusCode).json({
    message: "success",
    data,
  });
};
