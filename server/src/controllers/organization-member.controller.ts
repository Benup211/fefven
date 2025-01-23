import {OrganizationRepository,OrganizationMemberRepository} from "../repository"
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";


export class OrganizationMemberController{

    static async allOrganizationMembers(req:Request,res:Response,next:NextFunction){
        try{
            const organizationMembers= await OrganizationMemberRepository.allOrganizationMembers();
            return ResponseService.CreateSuccessResponse(organizationMembers,200,res);
        }catch (e){
            next(e);
        }
    }

    static async getOrganizationMembers(req:Request,res:Response,next:NextFunction){
        try{
            const id=parseInt(req.params.id);
            const organizationExist=await OrganizationRepository.getOrganization(id);
            if(!organizationExist){
                return ResponseService.CreateErrorResponse('Organization not found',404);
            }
            const organizationMember= await OrganizationMemberRepository.getOrganizationMembersByOrganizationId(id);
            return ResponseService.CreateSuccessResponse(organizationMember,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createOrganizationMember(req:Request,res:Response,next:NextFunction){
        try{
            const {name,contactNo,designation,designationPriority,organizationId}=req.body;
            const organizationExist=await OrganizationRepository.getOrganization(parseInt(organizationId));
            if(!organizationExist){
                return ResponseService.CreateErrorResponse('Organization not found',404);
            }
            const organizationMember= await OrganizationMemberRepository.createOrganizationMember(name,contactNo,designation,parseInt(designationPriority),parseInt(organizationId));
            return ResponseService.CreateSuccessResponse(organizationMember,200,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteOrganizationMember(req:Request,res:Response,next:NextFunction){
        try{
            const id=parseInt(req.params.id);
            const organizationMember= await OrganizationMemberRepository.deleteOrganizationMember(id);
            return ResponseService.CreateSuccessResponse(organizationMember,200,res);
        }catch (e){
            next(e);
        }
    }

    static async lengthOfOrganizationMembers(req:Request,res:Response,next:NextFunction){
        try{
            const length= await OrganizationMemberRepository.lengthOfOrganizationMembers();
            return ResponseService.CreateSuccessResponse(length,200,res);
        }catch (e){
            next(e);
        }
    }

}
