import {prisma} from "../model";

export class DistrictMemberRepository{

    static async allDistrictMember(){
        try{
            return await prisma.districtMember.findMany();
        }catch (e){
            throw new Error("Error while fetching DistrictMember items from database");
        }
    }

    static async getDistrictMember(id: number){
        try{
            return await prisma.districtMember.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching DistrictMember item from database");
        }
    }

    static async createDistrictMember(name: string, contactNo: string, imageUrl:string,designation: string, designationPriority: number, district: string){
        try{
            return await prisma.districtMember.create({
                data: {
                    name,
                    contactNo,
                    imageUrl,
                    designation,
                    designationPriority,
                    district
                }
            });
        }catch (e){
            throw new Error("Error while creating DistrictMember item in database");
        }
    }

    static async deleteDistrictMember(id: number){
        try{
            return await prisma.districtMember.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting DistrictMember item from database");
        }
    }

    static async lengthOfDistrictMember(){
        try{
            return await prisma.districtMember.count();
        }catch (e){
            throw new Error("Error while fetching length of DistrictMember items from database");
        }
    }

    static async districtMemberForUser(){
        try{
            return await prisma.districtMember.findMany({
                orderBy:{
                    designationPriority:"asc"
                }
            });
        }catch (e){
            throw new Error("Error while fetching DistrictMember items for user from database");
        }
    }
    
}