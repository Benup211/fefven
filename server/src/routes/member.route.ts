import { Router } from "express";
import { MemberController } from "../controllers";

class Member {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", MemberController.allItemCount);
    }
    postRoutes() {
    }
}
export const MemberRoutes = new Member().router;
