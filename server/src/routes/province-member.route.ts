import { Router } from "express";
import { ProvinceMemberController } from "../controllers";
import { ProvinceMemberValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { imageUpload } from "../services";

class ProvinceMember {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", ProvinceMemberController.allProvinceMember);
        this.router.delete("/delete/:id", ProvinceMemberController.deleteProvinceMember);
        this.router.get("/all/user",ProvinceMemberController.getProvinceMemberForUser);
    }
    postRoutes() {
        this.router.post(
            "/create",
            imageUpload.single("image"),
            ProvinceMemberValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            ProvinceMemberController.createProvinceMember
        );
    }
}
export const ProvinceMemberRoutes = new ProvinceMember().router;
