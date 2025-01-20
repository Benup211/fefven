import { NewsRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class NewsController {
    
    static async allNews(req:Request,res:Response,next:NextFunction){
        try{
            const news = await NewsRepository.allNews();
            return ResponseService.CreateSuccessResponse(news,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createNews(req:Request,res:Response,next:NextFunction){
        try{
            const {title,description,author,content} = req.body;
            const imageUrl = req.file?.filename;
            if(!imageUrl){
                return ResponseService.CreateErrorResponse("Image is required",400);
            }
            const news = await NewsRepository.createNews(title,description,author,imageUrl,content);
            return ResponseService.CreateSuccessResponse(news,201,res);
        }catch (e){
            next(e);
        }
    }

    static async getNews(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const news = await NewsRepository.getNews(id);
            if(!news){
                return ResponseService.CreateErrorResponse("News not found",404);
            }
            return ResponseService.CreateSuccessResponse(news,200,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteNews(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const newsExist= await NewsRepository.getNews(id);
            if(!newsExist){
                return ResponseService.CreateErrorResponse("News not found",404);
            }
            const news = await NewsRepository.deleteNews(id);
            return ResponseService.CreateSuccessResponse(news,200,res);
        }catch (e){
            next(e);
        }
    }
}