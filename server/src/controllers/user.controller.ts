import { Request, Response, NextFunction } from "express";
import { ResponseService} from "../services";
import { JwtService } from "../services";

export class UserController {

    static async login(req:Request,res:Response,next:NextFunction){
        try{
            const {username,password} = req.body;
            if(username !== process.env.ADMIN_LOGIN_USER || password !== process.env.ADMIN_LOGIN_PASSWORD){
                return ResponseService.CreateErrorResponse("Invalid Credentials",401);
            }
            await JwtService.sign(res,{userID:"admin"},process.env.JWT_SECRET as string, {expiresIn: "7d"});
            return ResponseService.CreateSuccessResponse("Login",200,res);
        }catch (e){
            next(e);
        }
    }

    static async logout(req:Request,res:Response,next:NextFunction){
        try{
            res.clearCookie("admintoken");
            return ResponseService.CreateSuccessResponse("Logout",200,res);
        }catch (e){
            next(e);
        }
    }

    static async checkAuth(req:Request,res:Response,next:NextFunction){
        try{
            if(req.body.userID){
                return ResponseService.CreateSuccessResponse("Authenticated",200,res);
            }
            return ResponseService.CreateErrorResponse("Unauthenticated",401);
        }catch (e){
            next(e);
        }
    }
}