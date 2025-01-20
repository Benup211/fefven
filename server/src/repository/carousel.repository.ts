import {prisma} from "../model";

export class CarouselRepository{

    static async allCarousel(){
        try{
            return await prisma.carousel.findMany();
        }catch (e){
            throw new Error("Error while fetching carousel items from database");
        }
    }

    static async getCarousel(id: number){
        try{
            return await prisma.carousel.findUnique({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while fetching carousel item from database");
        }
    }

    static async createCarousel(title: string, description: string, imageUrl: string){
        try{
            return await prisma.carousel.create({
                data: {
                    title,
                    description,
                    imageUrl
                }
            });
        }catch (e){
            throw new Error("Error while creating carousel item in database");
        }
    }

    static async deleteCarousel(id: number){
        try{
            return await prisma.carousel.delete({
                where: {
                    id
                }
            });
        }catch (e){
            throw new Error("Error while deleting carousel item from database");
        }
    }

    static async updateCarousel(id: number, title: string, description: string, imageUrl: string){
        try{
            return await prisma.carousel.update({
                where: {
                    id
                },
                data: {
                    title,
                    description,
                    imageUrl
                }
            });
        }catch (e){
            throw new Error("Error while updating carousel item in database");
        }
    }

    static async lengthOfCarousel(){
        try{
            return await prisma.carousel.count();
        }catch (e){
            throw new Error("Error while fetching length of carousel items from database");
        }
    }
}