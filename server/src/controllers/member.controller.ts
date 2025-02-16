import { FederationMemberRepository,ProvinceMemberRepository,DistrictMemberRepository,AdvisoryMemberRepository } from "../repository";
import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
export class MemberController {

    static async allItemCount(req:Request,res:Response,next:NextFunction){
        try{
            const federation= await FederationMemberRepository.lengthOfFederationMember();
            const province = await ProvinceMemberRepository.lengthOfProvinceMember();
            const district = await DistrictMemberRepository.lengthOfDistrictMember();
            const advisory= await AdvisoryMemberRepository.lengthOfAdvisoryMember();
            return ResponseService.CreateSuccessResponse({federation,province,district,advisory},200,res);
        }catch (e){
            next(e);
        }
    }

}