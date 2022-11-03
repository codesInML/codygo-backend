import { Hotel } from "@prisma/client";
import { prisma } from "../client";

type HotelPayload = Omit<Hotel, "id" | "brandID" | "createdAt" | "updatedAt">;

type UpdateHotelPayload = Partial<HotelPayload> & { brandID?: string };

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

export const getAllHotelService = async (
  skip: number,
  limit: number
): Promise<Hotel[]> => {
  return prisma.hotel.findMany({
    skip,
    take: limit,
  });
};

export const findHotelByID = async (id: string): Promise<Hotel | null> => {
  return prisma.hotel.findUnique({ where: { id } });
};

export const updateHotelService = async (
  data: UpdateHotelPayload,
  id: string
): Promise<Hotel> => {
  return await prisma.hotel.update({ where: { id }, data });
};

export const deleteHotelService = async (id: string): Promise<void> => {
  await prisma.hotel.delete({ where: { id } });
};
