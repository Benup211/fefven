import { prisma } from "../model";

export class FoundaryOrganizationMemberRepository {

    static async allFoundaryOrganizationMembers() {
        try {
            return await prisma.foundaryMember.findMany(
                {
                    orderBy:{
                        designationPriority: 'asc'
                    }
                }
            );
        } catch (e) {
            throw new Error(
                "Error while fetching Foundary OrganizationMember items from database"
            );
        }
    }

    static async getFoundaryOrganizationMember(id: number) {
        try {
            return await prisma.foundaryMember.findUnique({
                where: {
                    id,
                },
            });
        } catch (e) {
            throw new Error(
                "Error while fetching Foundary OrganizationMember item from database"
            );
        }
    }

    static async getFoundaryOrganizationMembersByOrganizationId(organizationId: number) {
        try {
            return await prisma.foundaryMember.findMany({
                where: {
                    organizationId
                },
                orderBy:{
                    designationPriority: 'asc'
                }
            });
        } catch (e) {
            throw new Error(
                "Error while fetching Foundary OrganizationMember item from database"
            );
        }
    }

    static async createFoundaryOrganizationMember(name:string,contactNo:string,designation:string,designationPriority:number,organizationId: number) {
        try {
            return await prisma.foundaryMember.create({
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

    static async deleteFoundaryOrganizationMember(id: number) {
        try {
            return await prisma.foundaryMember.delete({
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

    static async lengthOfFoundaryOrganizationMembers() {
        try {
            return await prisma.foundaryMember.count();
        } catch (e) {
            throw new Error(
                "Error while fetching Foundary length of OrganizationMember items from database"
            );
        }
    }

}