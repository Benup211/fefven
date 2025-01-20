import { EventsRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";

export class EventsController{
    
    static async allEvents(req:Request,res:Response,next:NextFunction){
        try{
            const events = await EventsRepository.allEvents();
            return ResponseService.CreateSuccessResponse(events,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createEvents(req:Request,res:Response,next:NextFunction){
        try{
            const {title,description,category,tags,startDate,startTime,endDate,endTime,venueName,venueAddress,city,organizerName,organizerContact,organizerWebsite} = req.body;
            const events = await EventsRepository.createEvents({title,description,category,tags,startDate,startTime,endDate,endTime,venueName,venueAddress,city,organizerName,organizerContact,organizerWebsite});
            return ResponseService.CreateSuccessResponse(events,201,res);
        }catch (e){
            next(e);
        }
    }

    static async getEvents(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const events = await EventsRepository.getEvents(id);
            return ResponseService.CreateSuccessResponse(events,200,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteEvents(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const eventsExist= await EventsRepository.getEvents(id);
            if(!eventsExist){
                return ResponseService.CreateErrorResponse("Events not found",404);
            }
            const events = await EventsRepository.deleteEvents(id);
            return ResponseService.CreateSuccessResponse(events,200,res);
        }catch (e){
            next(e);
        }
    }
}