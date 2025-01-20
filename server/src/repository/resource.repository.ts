import {prisma} from "../model";

export class ResourceRepository{

    static async allResource(){
        try{
            return await prisma.resource.findMany();
        }catch (e){
            throw new Error("Error while fetching Resource items from database");
        }
    }

    static async getResource(id: number){
        try{
            return await prisma.resource.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching Resource item from database");
        }
    }

    static async createResource(title: string, description: string, fileUrl: string){
        try{
            return await prisma.resource.create({
                data: {
                    title,
                    description,
                    fileUrl
                }
            });
        }catch (e){
            throw new Error("Error while creating Resource item in database");
        }
    }

    static async deleteResource(id: number){
        try{
            return await prisma.resource.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting Resource item from database");
        }
    }

    static async lengthOfResource(){
        try{
            return await prisma.resource.count();
        }catch (e){
            throw new Error("Error while fetching length of Resource items from database");
        }
    }
}