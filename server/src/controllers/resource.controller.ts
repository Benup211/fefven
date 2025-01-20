import { ResourceRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class ResourceController {

    static async allResource(req:Request,res:Response,next:NextFunction){
        try{
            const carousel = await ResourceRepository.allResource();
            return ResponseService.CreateSuccessResponse(carousel,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createResource(req:Request,res:Response,next:NextFunction){
        try{
            const {title,description} = req.body;
            const fileUrl = req.file?.filename;
            if(!fileUrl){
                return ResponseService.CreateErrorResponse("Pdf file is required",400);
            }
            const carousel = await ResourceRepository.createResource(title,description,fileUrl);
            return ResponseService.CreateSuccessResponse(carousel,201,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteResource(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const carouselExist= await ResourceRepository.getResource(id);
            if(!carouselExist){
                return ResponseService.CreateErrorResponse("file not found",404);
            }
            const carousel = await ResourceRepository.deleteResource(id);
            return ResponseService.CreateSuccessResponse(carousel,200,res);
        }catch (e){
            next(e);
        }
    }

}