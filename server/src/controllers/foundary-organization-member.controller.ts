import {FoundaryOrganizationRepository,FoundaryOrganizationMemberRepository} from "../repository"
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";


export class FoundaryOrganizationMemberController{

    static async allOrganizationMembers(req:Request,res:Response,next:NextFunction){
        try{
            const organizationMembers= await FoundaryOrganizationMemberRepository.allFoundaryOrganizationMembers();
            return ResponseService.CreateSuccessResponse(organizationMembers,200,res);
        }catch (e){
            next(e);
        }
    }

    static async getOrganizationMembers(req:Request,res:Response,next:NextFunction){
        try{
            const id=parseInt(req.params.id);
            const organizationExist=await FoundaryOrganizationRepository.getFoundaryOrganization(id);
            if(!organizationExist){
                return ResponseService.CreateErrorResponse('Organization not found',404);
            }
            const organizationMember= await FoundaryOrganizationMemberRepository.getFoundaryOrganizationMembersByOrganizationId(id);
            return ResponseService.CreateSuccessResponse(organizationMember,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createOrganizationMember(req:Request,res:Response,next:NextFunction){
        try{
            const {name,contactNo,designation,designationPriority,organizationId}=req.body;
            const organizationExist=await FoundaryOrganizationRepository.getFoundaryOrganization(parseInt(organizationId));
            if(!organizationExist){
                return ResponseService.CreateErrorResponse('Organization not found',404);
            }
            const organizationMember= await FoundaryOrganizationMemberRepository.createFoundaryOrganizationMember(name,contactNo,designation,parseInt(designationPriority),parseInt(organizationId));
            return ResponseService.CreateSuccessResponse(organizationMember,200,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteOrganizationMember(req:Request,res:Response,next:NextFunction){
        try{
            const id=parseInt(req.params.id);
            const organizationMember= await FoundaryOrganizationMemberRepository.deleteFoundaryOrganizationMember(id);
            return ResponseService.CreateSuccessResponse(organizationMember,200,res);
        }catch (e){
            next(e);
        }
    }

    static async lengthOfOrganizationMembers(req:Request,res:Response,next:NextFunction){
        try{
            const length= await FoundaryOrganizationMemberRepository.lengthOfFoundaryOrganizationMembers();
            return ResponseService.CreateSuccessResponse(length,200,res);
        }catch (e){
            next(e);
        }
    }

}
