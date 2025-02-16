import { FlashNewsRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class FlashNewsController {

    static async getFirstFlashNews(req:Request,res:Response,next:NextFunction){
        try{
            const flashNews = await FlashNewsRepository.getFirstFlashNews();
            return ResponseService.CreateSuccessResponse(flashNews,200,res);
        }catch (e){
            next(e);
        }
    }

    static async allFlashNews(req:Request,res:Response,next:NextFunction){
        try{
            const flashNews = await FlashNewsRepository.getFlashNews();
            return ResponseService.CreateSuccessResponse(flashNews,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createFlashNew(req:Request,res:Response,next:NextFunction){
        try{
            const {title} = req.body;
            const imageUrl = req.file?.filename;
            if(!imageUrl){
                return ResponseService.CreateErrorResponse("Image file is required",400);
            }
            const flashNews = await FlashNewsRepository.createFlashNew(title,imageUrl);
            return ResponseService.CreateSuccessResponse(flashNews,201,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteFlashNews(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const carouselExist= await FlashNewsRepository.getFlashNewById(id);
            if(!carouselExist){
                return ResponseService.CreateErrorResponse("Flash News not found",404);
            }
            const flashNews = await FlashNewsRepository.deleteFlashNew(id);
            return ResponseService.CreateSuccessResponse(flashNews,200,res);
        }catch (e){
            next(e);
        }
    }

}