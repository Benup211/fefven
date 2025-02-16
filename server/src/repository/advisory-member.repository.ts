import {prisma} from "../model";

export class AdvisoryMemberRepository{

    static async allAdvisoryMember(){
        try{
            return await prisma.advisoryMember.findMany();
        }catch (e){
            throw new Error("Error while fetching AdvisoryMember items from database");
        }
    }

    static async getAdvisoryMember(id: number){
        try{
            return await prisma.advisoryMember.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching AdvisoryMember item from database");
        }
    }

    static async createAdvisoryMember(name: string, contactNo: string, imageUrl:string,designation: string, designationPriority: number){
        try{
            return await prisma.advisoryMember.create({
                data: {
                    name,
                    contactNo,
                    imageUrl,
                    designation,
                    designationPriority,
                }
            });
        }catch (e){
            throw new Error("Error while creating AdvisoryMember item in database");
        }
    }

    static async deleteAdvisoryMember(id: number){
        try{
            return await prisma.advisoryMember.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting AdvisoryMember item from database");
        }
    }

    static async lengthOfAdvisoryMember(){
        try{
            return await prisma.advisoryMember.count();
        }catch (e){
            throw new Error("Error while fetching length of AdvisoryMember items from database");
        }
    }

    static async advisoryMemberForUser(){
        try{
            return await prisma.advisoryMember.findMany({
                orderBy:{
                    designationPriority:"asc"
                }
            });
        }catch (e){
            throw new Error("Error while fetching AdvisoryMember items for user from database");
        }
    }
    
}