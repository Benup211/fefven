import {prisma} from "../model";

export class ProvinceMemberRepository{

    static async allProvinceMember(){
        try{
            return await prisma.provinceMember.findMany();
        }catch (e){
            throw new Error("Error while fetching ProvinceMember items from database");
        }
    }

    static async getProvinceMember(id: number){
        try{
            return await prisma.provinceMember.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching ProvinceMember item from database");
        }
    }

    static async createProvinceMember(name: string, contactNo: string, imageUrl:string,designation: string, designationPriority: number, province: number){
        try{
            return await prisma.provinceMember.create({
                data: {
                    name,
                    contactNo,
                    imageUrl,
                    designation,
                    designationPriority,
                    province
                }
            });
        }catch (e){
            throw new Error("Error while creating ProvinceMember item in database");
        }
    }

    static async deleteProvinceMember(id: number){
        try{
            return await prisma.provinceMember.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting ProvinceMember item from database");
        }
    }

    static async lengthOfProvinceMember(){
        try{
            return await prisma.provinceMember.count();
        }catch (e){
            throw new Error("Error while fetching length of ProvinceMember items from database");
        }
    }

    static async provinceMemberForUser(){
        try{
            return await prisma.provinceMember.findMany({
                orderBy:{
                    designationPriority: "asc"
                }
            });
        }catch (e){
            throw new Error("Error while fetching ProvinceMember items from database");
        }
    }
}