import { body, check, oneOf } from "express-validator";

export const createHotelSchema = () => {
  return [
    body("name").notEmpty().withMessage("Please provide hotel name"),
    body("city").notEmpty().withMessage("Please provide hotel city"),
    body("country").notEmpty().withMessage("Please provide hotel country"),
    body("address").notEmpty().withMessage("Please provide hotel address"),
    body("price").notEmpty().withMessage("Please provide hotel price"),
    body("ratings").notEmpty().withMessage("Please provide hotel ratings"),
    body("number_of_ratings")
      .notEmpty()
      .withMessage("Please provide hotel number_of_ratings"),
  ];
};

export const filterHotelByBrandSchema = () => {
  return [
    check("brands.*").isString().notEmpty(),
    body("brands")
      .isArray({ min: 1 })
      .withMessage("please provide filter parameters"),
  ];
};
