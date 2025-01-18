import { CarouselRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class CarouselController {

    static async allCarousel(req:Request,res:Response,next:NextFunction){
        try{
            const carousel = await CarouselRepository.allCarousel();
            return ResponseService.CreateSuccessResponse(carousel,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createCarousel(req:Request,res:Response,next:NextFunction){
        try{
            const {title,description} = req.body;
            const imageUrl = req.file?.filename;
            if(!imageUrl){
                return ResponseService.CreateErrorResponse("Image file is required",400);
            }
            const carousel = await CarouselRepository.createCarousel(title,description,imageUrl);
            return ResponseService.CreateSuccessResponse(carousel,201,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteCarousel(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const carouselExist= await CarouselRepository.getCarousel(id);
            if(!carouselExist){
                return ResponseService.CreateErrorResponse("Carousel not found",404);
            }
            const carousel = await CarouselRepository.deleteCarousel(id);
            return ResponseService.CreateSuccessResponse(carousel,200,res);
        }catch (e){
            next(e);
        }
    }

}