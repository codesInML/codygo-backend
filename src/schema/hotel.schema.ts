import { body, check, oneOf } from "express-validator";

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

export const updateHotelSchema = () => {
  return [
    oneOf([
      body("name").exists().isString(),
      body("city").exists().isString(),
      body("country").exists().isString(),
      body("address").exists().isString(),
      body("price").exists().isString(),
      body("ratings").exists().isString(),
      body("brandID").exists().isString(),
    ]),
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
