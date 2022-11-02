import { body } from "express-validator";

export const createBrandSchema = () => {
  return [
    body("name")
      .isString()
      .withMessage("Invalid brand name")
      .notEmpty()
      .withMessage("Please provide a brand name"),
  ];
};

export const updateBrandSchema = () => {
  return [
    body("brandName")
      .notEmpty()
      .withMessage("Please provide a brand to search"),
    body("name")
      .isString()
      .withMessage("Invalid brand name")
      .notEmpty()
      .withMessage("Please provide your new brand name"),
  ];
};
