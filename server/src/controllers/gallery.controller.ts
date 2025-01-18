import { GalleryRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class GalleryController{

    static async allGallery(req:Request,res:Response,next:NextFunction){
        try{
            const gallery = await GalleryRepository.getGallery();
            return ResponseService.CreateSuccessResponse(gallery,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createGallery(req:Request,res:Response,next:NextFunction){
        try{
            const {title} = req.body;
            const imageUrl = req.file?.filename;
            if(!imageUrl){
                return ResponseService.CreateErrorResponse("Image file is required",400);
            }
            const gallery = await GalleryRepository.createGallery(title,imageUrl);
            return ResponseService.CreateSuccessResponse(gallery,201,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteGallery(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const galleryExist= await GalleryRepository.getGalleryItem(id);
            if(!galleryExist){
                return ResponseService.CreateErrorResponse("Gallery item not found",404);
            }
            const gallery = await GalleryRepository.deleteGallery(id);
            return ResponseService.CreateSuccessResponse(gallery,200,res);
        }catch (e){
            next(e);
        }
    }

}