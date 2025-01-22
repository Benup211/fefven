import { Router } from "express";
import { DistrictMemberController } from "../controllers";
import { DistrictMemberValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { imageUpload } from "../services";

class DistrictMember {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", DistrictMemberController.allDistrictMember);
        this.router.delete("/delete/:id", DistrictMemberController.deleteDistrictMember);
        this.router.get("/all/user",DistrictMemberController.getDistrictMemberForUser);
    }
    postRoutes() {
        this.router.post(
            "/create",
            imageUpload.single("image"),
            DistrictMemberValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            DistrictMemberController.createDistrictMember
        );
    }
}
export const DistrictMemberRoutes = new DistrictMember().router;
