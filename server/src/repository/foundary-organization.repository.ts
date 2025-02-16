import { prisma } from "../model";

export class FoundaryOrganizationRepository {
    static async allFoundaryOrganizations() {
        try {
            return await prisma.foundaryOrganization.findMany();
        } catch (e) {
            throw new Error(
                "Error while fetching Foundary Organization items from database"
            );
        }
    }

    static async getFoundaryOrganization(id: number) {
        try {
            return await prisma.foundaryOrganization.findUnique({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while fetching Foundary Organization item from database"
            );
        }
    }

    static async createFoundaryOrganization(name: string, establishedAt: string) {
        try {
            return await prisma.foundaryOrganization.create({
                data: {
                    name,
                    establishedAt,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while creating Foundary Organization item in database"
            );
        }
    }
    static async deleteFoundaryOrganization(id: number) {
        try {
            return await prisma.foundaryOrganization.delete({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while deleting Foundary Organization item from database"
            );
        }
    }

    static async lengthOfFoundaryOrganizations() {
        try {
            return await prisma.foundaryOrganization.count();
        } catch (e) {
            throw new Error(
                "Error while fetching length of Foundary Organization items from database"
            );
        }
    }
}
