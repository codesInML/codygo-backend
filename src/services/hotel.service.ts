import { Hotel } from "@prisma/client";
import { prisma } from "../client";

type HotelPayload = Omit<Hotel, "id" | "brandID" | "createdAt" | "updatedAt">;

export const createHotelService = async (
  data: HotelPayload,
  brandID?: string
): Promise<Hotel> => {
  if (brandID)
    return await prisma.hotel.create({
      data: { ...data, brandID },
    });

  return await prisma.hotel.create({ data });
};

export const getAllHotelService = async (): Promise<Hotel[]> => {
  return prisma.hotel.findMany();
};

export const findHotelByID = async (id: string): Promise<Hotel | null> => {
  return prisma.hotel.findUnique({ where: { id } });
};
