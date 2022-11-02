import { body } from "express-validator";

export const brandSchema = () => {
  return [
    body("name")
      .isString()
      .withMessage("Invalid brand name")
      .notEmpty()
      .withMessage("Please provide a brand name"),
  ];
};
