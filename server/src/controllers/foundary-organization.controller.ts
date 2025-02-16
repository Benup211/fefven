import {FoundaryOrganizationRepository} from "../repository"
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";


export class FoundaryOrganizationController{

    static async allOrganizations(req:Request,res:Response,next:NextFunction){
        try{
            const organizations= await FoundaryOrganizationRepository.allFoundaryOrganizations();
            return ResponseService.CreateSuccessResponse(organizations,200,res);
        }catch (e){
            next(e);
        }
    }

    static async getOrganization(req:Request,res:Response,next:NextFunction){
        try{
            const id=parseInt(req.params.id);
            const organization= await FoundaryOrganizationRepository.getFoundaryOrganization(id);
            return ResponseService.CreateSuccessResponse(organization,200,res);
        }catch (e){
            next(e);
        }
    }

    static async createOrganization(req:Request,res:Response,next:NextFunction){
        try{
            const {name,establishedAt}=req.body;
            const organization= await FoundaryOrganizationRepository.createFoundaryOrganization(name,establishedAt);
            return ResponseService.CreateSuccessResponse(organization,200,res);
        }catch (e){
            next(e);
        }
    }

    static async deleteOrganization(req:Request,res:Response,next:NextFunction){
        try{
            const id=parseInt(req.params.id);
            const organization= await FoundaryOrganizationRepository.deleteFoundaryOrganization(id);
            return ResponseService.CreateSuccessResponse(organization,200,res);
        }catch (e){
            next(e);
        }
    }

    static async lengthOfOrganizations(req:Request,res:Response,next:NextFunction){
        try{
            const length= await FoundaryOrganizationRepository.lengthOfFoundaryOrganizations();
            return ResponseService.CreateSuccessResponse(length,200,res);
        }catch (e){
            next(e);
        }
    }

}