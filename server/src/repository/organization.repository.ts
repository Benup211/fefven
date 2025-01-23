import { prisma } from "../model";

export class OrganizationRepository {
    static async allOrganizations() {
        try {
            return await prisma.organization.findMany();
        } catch (e) {
            throw new Error(
                "Error while fetching Organization items from database"
            );
        }
    }

    static async getOrganization(id: number) {
        try {
            return await prisma.organization.findUnique({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while fetching Organization item from database"
            );
        }
    }

    static async createOrganization(name: string, establishedAt: string) {
        try {
            return await prisma.organization.create({
                data: {
                    name,
                    establishedAt,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while creating Organization item in database"
            );
        }
    }

    static async deleteOrganization(id: number) {
        try {
            return await prisma.organization.delete({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while deleting Organization item from database"
            );
        }
    }

    static async lengthOfOrganizations() {
        try {
            return await prisma.organization.count();
        } catch (e) {
            throw new Error(
                "Error while fetching length of Organization items from database"
            );
        }
    }
}
