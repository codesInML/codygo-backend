import { body } from "express-validator";

export const createHotelSchema = () => {
  return [
    body("name").notEmpty().withMessage("Please provide hotel name"),
    body("city").notEmpty().withMessage("Please provide hotel city"),
    body("country").notEmpty().withMessage("Please provide hotel country"),
    body("address").notEmpty().withMessage("Please provide hotel address"),
    body("price").notEmpty().withMessage("Please provide hotel price"),
    body("ratings").notEmpty().withMessage("Please provide hotel ratings"),
  ];
};
