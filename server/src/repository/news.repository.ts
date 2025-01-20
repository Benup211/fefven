import {prisma} from "../model";

export class NewsRepository{

    static async allNews(){
        try{
            return await prisma.news.findMany();
        }catch (e){
            throw new Error("Error while fetching News items from database");
        }
    }

    static async getNews(id: number){
        try{
            return await prisma.news.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching News item from database");
        }
    }

    static async createNews(title: string, description: string, author: string,imageUrl:string ,content: string){
        try{
            return await prisma.news.create({
                data: {
                    title,
                    description,
                    author,
                    imageUrl,
                    content
                }
            });
        }catch (e){
            throw new Error("Error while creating News item in database");
        }
    }

    static async deleteNews(id: number){
        try{
            return await prisma.news.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting News item from database");
        }
    }

    static async lengthOfNews(){
        try{
            return await prisma.news.count();
        }catch (e){
            throw new Error("Error while fetching length of News items from database");
        }
    }

}
