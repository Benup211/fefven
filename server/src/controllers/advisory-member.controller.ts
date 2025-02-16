import { AdvisoryMemberRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class AdvisoryMemberController {

    static async allAdvisoryMember(req:Request,res:Response,next:NextFunction){
        try{
            const members = await AdvisoryMemberRepository.allAdvisoryMember();
            return ResponseService.CreateSuccessResponse(members,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createAdvisoryMember(req:Request,res:Response,next:NextFunction){
        try{
            const {name,contactNo,designation,designationPriority} = req.body;
            const imageUrl = req.file?.filename;
            if(!imageUrl){
                return ResponseService.CreateErrorResponse("Image file is required",400);
            }
            const member = await AdvisoryMemberRepository.createAdvisoryMember(name,contactNo,imageUrl,designation,parseInt(designationPriority));
            return ResponseService.CreateSuccessResponse(member,201,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteAdvisoryMember(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const memberExist= await AdvisoryMemberRepository.getAdvisoryMember(id);
            if(!memberExist){
                return ResponseService.CreateErrorResponse("Advisory Member not found",404);
            }
            const member = await AdvisoryMemberRepository.deleteAdvisoryMember(id);
            return ResponseService.CreateSuccessResponse(member,200,res);
        }catch (e){
            next(e);
        }
    }

    static async getAdvisoryMemberForUser(req:Request,res:Response,next:NextFunction){
        try{
            const advisoryMember=await AdvisoryMemberRepository.advisoryMemberForUser();
            return ResponseService.CreateSuccessResponse(advisoryMember,200,res);
        }catch(e){
            next(e);
        }
    }

}