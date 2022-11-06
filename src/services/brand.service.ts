import { Brand } from "@prisma/client";
import { prisma } from "../client";

export const createBrandService = async (name: string): Promise<Brand> => {
  return await prisma.brand.create({ data: { name } });
};

export const getAllBrandService = async (): Promise<Brand[]> => {
  return await prisma.brand.findMany({ include: { hotel: true } });
};

export const getABrandService = async (name: string): Promise<Brand | null> => {
  return await prisma.brand.findUnique({ where: { name } });
};

export const updateBrandService = async (
  name: string,
  data: { name: string }
): Promise<Brand> => {
  return await prisma.brand.update({ where: { name }, data });
};

export const deleteBrandService = async (name: string): Promise<void> => {
  const brand = await prisma.brand.findUnique({ where: { name } });
  await prisma.hotel.updateMany({
    where: { brandID: brand?.id },
    data: { brandID: null },
  });
  await prisma.brand.delete({ where: { name } });
};

export const findBrandByID = async (id: string): Promise<Brand | null> => {
  return await prisma.brand.findUnique({ where: { id } });
};
