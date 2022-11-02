import { prisma } from "../client";

export const createBrandService = async (name: string) => {
  return await prisma.brand.create({ data: { name } });
};
