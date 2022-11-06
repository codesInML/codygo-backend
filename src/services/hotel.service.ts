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
      data: {
        ...data,
        brand: { connect: { id: brandID } },
        images: { create: images },
      },
    });

  return await prisma.hotel.create({
    data: { ...data, images: { create: images } },
  });
};

export const getAllHotelService = async (
  skip: number,
  limit: number,
  orderBy?: "price" | "ratings"
): Promise<{ hotels: Hotel[]; total: number }> => {
  if (orderBy == "price") {
    const hotels = await prisma.hotel.findMany({
      include: { images: { where: { isMain: true } } },
      skip,
      take: limit,
      orderBy: { price: "desc" },
    });
    const count = await prisma.hotel.count();
    return { hotels, total: count };
  } else if (orderBy == "ratings") {
    const hotels = await prisma.hotel.findMany({
      include: { images: { where: { isMain: true } } },
      skip,
      take: limit,
      orderBy: { ratings: "desc" },
    });
    const count = await prisma.hotel.count();
    return { hotels, total: count };
  } else {
    const hotels = await prisma.hotel.findMany({
      include: { images: { where: { isMain: true } } },
      skip,
      take: limit,
    });
    const count = await prisma.hotel.count();
    return { hotels, total: count };
  }
};

export const findHotelByID = async (id: string): Promise<Hotel | null> => {
  return prisma.hotel.findUnique({ where: { id }, include: { images: true } });
};

export const updateHotelService = async (
  data: UpdateHotelPayload,
  id: string
): Promise<Hotel> => {
  return await prisma.hotel.update({ where: { id }, data });
};

export const deleteHotelService = async (id: string): Promise<void> => {
  await prisma.hotelImages.deleteMany({ where: { hotelID: id } });
  await prisma.hotel.delete({ where: { id } });
};

export const filterHotelByBrandService = async (
  skip: number,
  limit: number,
  brands: string[]
): Promise<{ hotels: Hotel[]; total: number }> => {
  const total = await prisma.hotel.count({
    where: { brandID: { in: brands } },
  });
  const hotels = await prisma.hotel.findMany({
    where: { brandID: { in: brands } },
    skip,
    take: limit,
    include: { images: { where: { isMain: true } } },
  });

  return { hotels, total };
};
