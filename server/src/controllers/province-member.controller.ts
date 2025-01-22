import { ProvinceMemberRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class ProvinceMemberController {

    static async allProvinceMember(req:Request,res:Response,next:NextFunction){
        try{
            const members = await ProvinceMemberRepository.allProvinceMember();
            return ResponseService.CreateSuccessResponse(members,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createProvinceMember(req:Request,res:Response,next:NextFunction){
        try{
            const {name,contactNo,designation,designationPriority,province} = req.body;
            const imageUrl = req.file?.filename;
            if(!imageUrl){
                return ResponseService.CreateErrorResponse("Image file is required",400);
            }
            const member = await ProvinceMemberRepository.createProvinceMember(name,contactNo,imageUrl,designation,parseInt(designationPriority),parseInt(province));
            return ResponseService.CreateSuccessResponse(member,201,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteProvinceMember(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const memberExist= await ProvinceMemberRepository.getProvinceMember(id);
            if(!memberExist){
                return ResponseService.CreateErrorResponse("Province Member not found",404);
            }
            const member = await ProvinceMemberRepository.deleteProvinceMember(id);
            return ResponseService.CreateSuccessResponse(member,200,res);
        }catch (e){
            next(e);
        }
    }

    static async getProvinceMemberForUser(req:Request,res:Response,next:NextFunction){
        try{
            const provinceMember=await ProvinceMemberRepository.provinceMemberForUser();
            return ResponseService.CreateSuccessResponse(provinceMember,200,res);
        }catch(e){
            next(e);
        }
    }

}