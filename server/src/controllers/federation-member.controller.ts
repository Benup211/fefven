import { FederationMemberRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class FederationMemberController {

    static async allFederationMember(req:Request,res:Response,next:NextFunction){
        try{
            const members = await FederationMemberRepository.allFederationMember();
            return ResponseService.CreateSuccessResponse(members,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createFederationMember(req:Request,res:Response,next:NextFunction){
        try{
            const {name,contactNo,designation,startDate,endDate,designationPriority,enrollmentStatus} = req.body;
            const imageUrl = req.file?.filename;
            if(!imageUrl){
                return ResponseService.CreateErrorResponse("Image file is required",400);
            }
            const designationPriorityInt=parseInt(designationPriority);
            const member = await FederationMemberRepository.createFederationMember(name,contactNo,imageUrl,designation,startDate,endDate,designationPriorityInt,enrollmentStatus);
            return ResponseService.CreateSuccessResponse(member,201,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteFederationMember(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const memberExist= await FederationMemberRepository.getFederationMember(id);
            if(!memberExist){
                return ResponseService.CreateErrorResponse("Federation Member not found",404);
            }
            const member = await FederationMemberRepository.deleteFederationMember(id);
            return ResponseService.CreateSuccessResponse(member,200,res);
        }catch (e){
            next(e);
        }
    }

    static async getFederationMemberForUser(req:Request,res:Response,next:NextFunction){
        try{
            const presentMember=await FederationMemberRepository.presentFederationMember();
            const pastMember=await FederationMemberRepository.pastFederationMember();
            return ResponseService.CreateSuccessResponse({presentMember,pastMember},200,res);
        }catch(e){
            next(e);
        }
    }

}