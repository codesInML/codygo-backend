import { NextFunction } from "express";
import { unlink } from "fs";

export const deleteUpload = (upload_url: string, next: NextFunction) => {
  unlink(upload_url, (err) => {
    if (err) next(err);
  });
};
