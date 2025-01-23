import {OrganizationRepository} from "../repository"
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";


export class OrganizationController{

    static async allOrganizations(req:Request,res:Response,next:NextFunction){
        try{
            const organizations= await OrganizationRepository.allOrganizations();
            return ResponseService.CreateSuccessResponse(organizations,200,res);
        }catch (e){
            next(e);
        }
    }

    static async getOrganization(req:Request,res:Response,next:NextFunction){
        try{
            const id=parseInt(req.params.id);
            const organization= await OrganizationRepository.getOrganization(id);
            return ResponseService.CreateSuccessResponse(organization,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createOrganization(req:Request,res:Response,next:NextFunction){
        try{
            const {name,establishedAt}=req.body;
            const organization= await OrganizationRepository.createOrganization(name,establishedAt);
            return ResponseService.CreateSuccessResponse(organization,200,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteOrganization(req:Request,res:Response,next:NextFunction){
        try{
            const id=parseInt(req.params.id);
            const organization= await OrganizationRepository.deleteOrganization(id);
            return ResponseService.CreateSuccessResponse(organization,200,res);
        }catch (e){
            next(e);
        }
    }

    static async lengthOfOrganizations(req:Request,res:Response,next:NextFunction){
        try{
            const length= await OrganizationRepository.lengthOfOrganizations();
            return ResponseService.CreateSuccessResponse(length,200,res);
        }catch (e){
            next(e);
        }
    }

}