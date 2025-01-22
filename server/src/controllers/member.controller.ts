import { FederationMemberRepository,ProvinceMemberRepository,DistrictMemberRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class MemberController {

    static async allItemCount(req:Request,res:Response,next:NextFunction){
        try{
            const federation= await FederationMemberRepository.lengthOfFederationMember();
            const province = await ProvinceMemberRepository.lengthOfProvinceMember();
            const district = await DistrictMemberRepository.lengthOfDistrictMember();
            return ResponseService.CreateSuccessResponse({federation,province,district},200,res);
        }catch (e){
            next(e);
        }
    }

}