import { ResourceRepository,EventsRepository,GalleryRepository,NewsRepository,CarouselRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class DashboardController {

    static async allItemCount(req:Request,res:Response,next:NextFunction){
        try{
            const resource = await ResourceRepository.lengthOfResource();
            const events = await EventsRepository.lengthOfEvents();
            const gallery = await GalleryRepository.lengthOfGallery();
            const news = await NewsRepository.lengthOfNews();
            const carousel = await CarouselRepository.lengthOfCarousel();
            return ResponseService.CreateSuccessResponse({resource,events,gallery,news,carousel},200,res);
        }catch (e){
            next(e);
        }
    }

}