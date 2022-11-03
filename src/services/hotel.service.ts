import { Hotel } from "@prisma/client";
import { prisma } from "../client";

type HotelPayload = Omit<Hotel, "id" | "brandID" | "createdAt" | "updatedAt">;

type UpdateHotelPayload = Partial<HotelPayload> & { brandID?: string };

export const createHotelService = async (
  data: HotelPayload,
  images: { image: string; isMain: boolean }[],
  brandID?: string
): Promise<Hotel> => {
  if (brandID)
    return await prisma.hotel.create({
      data: { ...data, brandID, images: { create: images } },
    });

  return await prisma.hotel.create({ data });
};

export const getAllHotelService = async (
  skip: number,
  limit: number,
  orderBy?: "price" | "ratings"
): Promise<{ hotels: Hotel[]; totalPages: number }> => {
  if (orderBy == "price") {
    const hotels = await prisma.hotel.findMany({
      skip,
      take: limit,
      orderBy: { price: "desc" },
    });
    const count = await prisma.hotel.count();
    return { hotels, totalPages: Math.ceil(count / limit) };
  } else if (orderBy == "ratings") {
    const hotels = await prisma.hotel.findMany({
      skip,
      take: limit,
      orderBy: { ratings: "desc" },
    });
    const count = await prisma.hotel.count();
    return { hotels, totalPages: Math.ceil(count / limit) };
  } else {
    const hotels = await prisma.hotel.findMany({
      skip,
      take: limit,
    });
    const count = await prisma.hotel.count();
    return { hotels, totalPages: Math.ceil(count / limit) };
  }
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
