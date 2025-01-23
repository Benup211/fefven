import { prisma } from "../model";

export class OrganizationMemberRepository {

    static async allOrganizationMembers() {
        try {
            return await prisma.organizationMember.findMany(
                {
                    orderBy:{
                        designationPriority: 'asc'
                    }
                }
            );
        } catch (e) {
            throw new Error(
                "Error while fetching OrganizationMember items from database"
            );
        }
    }

    static async getOrganizationMember(id: number) {
        try {
            return await prisma.organizationMember.findUnique({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while fetching OrganizationMember item from database"
            );
        }
    }

    static async getOrganizationMembersByOrganizationId(organizationId: number) {
        try {
            return await prisma.organizationMember.findMany({
                where: {
                    organizationId
                },
                orderBy:{
                    designationPriority: 'asc'
                }
            });
        } catch (e) {
            throw new Error(
                "Error while fetching OrganizationMember item from database"
            );
        }
    }

    static async createOrganizationMember(name:string,contactNo:string,designation:string,designationPriority:number,organizationId: number) {
        try {
            return await prisma.organizationMember.create({
                data: {
                    name,
                    contactNo,
                    designation,
                    designationPriority,
                    organizationId
                },
            });
        } catch (e) {
            throw new Error(
                "Error while creating OrganizationMember item in database"
            );
        }
    }

    static async deleteOrganizationMember(id: number) {
        try {
            return await prisma.organizationMember.delete({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while deleting OrganizationMember item from database"
            );
        }
    }

    static async lengthOfOrganizationMembers() {
        try {
            return await prisma.organizationMember.count();
        } catch (e) {
            throw new Error(
                "Error while fetching length of OrganizationMember items from database"
            );
        }
    }

}