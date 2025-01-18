import { prisma } from "../model";

export class GalleryRepository {
    static async getGallery() {
        try {
            return await prisma.gallery.findMany(
                {
                    orderBy: {
                        createdAt: 'desc',
                    },
                }
            );
        } catch (e) {
            throw new Error("Error while fetching gallery items from database");
        }
    }

    static async getGalleryItem(id: number) {
        try {
            return await prisma.gallery.findUnique({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error("Error while fetching gallery item from database");
        }
    }

    static async createGallery(title: string, imageUrl: string) {
        try {
            return await prisma.gallery.create({
                data: {
                    title,
                    imageUrl,
                }
            });
        } catch (e) {
            throw new Error("Error while creating gallery item in database");
        }
    }

    static async deleteGallery(id: number) {
        try {
            return await prisma.gallery.delete({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error("Error while deleting gallery item from database");
        }
    }

}
