import {prisma} from "../model";

export class FederationMemberRepository{

    static async allFederationMember(){
        try{
            return await prisma.federationMember.findMany();
        }catch (e){
            throw new Error("Error while fetching FederationMember items from database");
        }
    }

    static async getFederationMember(id: number){
        try{
            return await prisma.federationMember.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching FederationMember item from database");
        }
    }

    static async createFederationMember(name: string, contactNo: string, imageUrl:string,designation: string, startDate: string, endDate: string, designationPriority: number, enrollmentStatus: "PAST" | "PRESENT"){
        try{
            return await prisma.federationMember.create({
                data: {
                    name,
                    contactNo,
                    imageUrl,
                    designation,
                    startDate,
                    endDate,
                    designationPriority,
                    enrollmentStatus
                }
            });
        }catch (e){
            throw new Error("Error while creating FederationMember item in database");
        }
    }

    static async deleteFederationMember(id: number){
        try{
            return await prisma.federationMember.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting FederationMember item from database");
        }
    }

    static async lengthOfFederationMember(){
        try{
            return await prisma.federationMember.count();
        }catch (e){
            throw new Error("Error while fetching length of FederationMember items from database");
        }
    }

    static async presentFederationMember(){
        try{
            return await prisma.federationMember.findMany({
                where: {
                    enrollmentStatus: "PRESENT"
                },
                orderBy:{
                    designationPriority: "asc"
                }
            });
        }catch (e){
            throw new Error("Error while fetching present FederationMember items from database");
        }
    }

    static async pastFederationMember(){
        try{
            return await prisma.federationMember.findMany({
                where: {
                    enrollmentStatus: "PAST"
                },
                orderBy:{
                    designationPriority: "asc"
                }
            })
        }catch (e){
            throw new Error("Error while fetching past FederationMember items from database");
        }
    }

}