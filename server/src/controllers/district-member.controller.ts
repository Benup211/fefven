import { DistrictMemberRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class DistrictMemberController {

    static async allDistrictMember(req:Request,res:Response,next:NextFunction){
        try{
            const members = await DistrictMemberRepository.allDistrictMember();
            return ResponseService.CreateSuccessResponse(members,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createDistrictMember(req:Request,res:Response,next:NextFunction){
        try{
            const {name,contactNo,designation,designationPriority,district} = req.body;
            const imageUrl = req.file?.filename;
            if(!imageUrl){
                return ResponseService.CreateErrorResponse("Image file is required",400);
            }
            const member = await DistrictMemberRepository.createDistrictMember(name,contactNo,imageUrl,designation,parseInt(designationPriority),district);
            return ResponseService.CreateSuccessResponse(member,201,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteDistrictMember(req:Request,res:Response,next:NextFunction){
        try{
            const id = parseInt(req.params.id);
            const memberExist= await DistrictMemberRepository.getDistrictMember(id);
            if(!memberExist){
                return ResponseService.CreateErrorResponse("District Member not found",404);
            }
            const member = await DistrictMemberRepository.deleteDistrictMember(id);
            return ResponseService.CreateSuccessResponse(member,200,res);
        }catch (e){
            next(e);
        }
    }

    static async getDistrictMemberForUser(req:Request,res:Response,next:NextFunction){
        try{
            const districtMember=await DistrictMemberRepository.districtMemberForUser();
            return ResponseService.CreateSuccessResponse(districtMember,200,res);
        }catch(e){
            next(e);
        }
    }

}