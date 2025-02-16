import { Router } from "express";
import { AdvisoryMemberController } from "../controllers";
import { AdvisoryMemberValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { imageUpload } from "../services";

class AdvisoryMember {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", AdvisoryMemberController.allAdvisoryMember);
        this.router.delete("/delete/:id", AdvisoryMemberController.deleteAdvisoryMember);
        this.router.get("/all/user",AdvisoryMemberController.getAdvisoryMemberForUser);
    }
    postRoutes() {
        this.router.post(
            "/create",
            imageUpload.single("image"),
            AdvisoryMemberValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            AdvisoryMemberController.createAdvisoryMember
        );
    }
}
export const AdvisoryMemberRoutes = new AdvisoryMember().router;
