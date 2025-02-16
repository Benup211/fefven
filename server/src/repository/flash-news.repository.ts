import {prisma} from "../model";

export class FlashNewsRepository{

    static async getFlashNews(){
        try{
            return await prisma.flashNews.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }catch (e){
            throw new Error("Error while fetching flash News items from database");
        }
    }

    static async getFirstFlashNews(){
        try{
            return await prisma.flashNews.findFirst({
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }catch (e){
            throw new Error("Error while fetching flash News items from database");
        }
    }

    static async getFlashNewById(id: number){
        try{
            return await prisma.flashNews.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching flash News item from database");
        }
    }

    static async createFlashNew(title: string, imageUrl: string){
        try{
            return await prisma.flashNews.create({
                data: {
                    title,
                    imageUrl
                }
            });
        }catch (e){
            throw new Error("Error while creating flash News item in database");
        }
    }

    static async deleteFlashNew(id: number){
        try{
            return await prisma.flashNews.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting flash News item from database");
        }
    }


}