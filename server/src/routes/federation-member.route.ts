import { Router } from "express";
import { FederationMemberController } from "../controllers";
import { FederationMemberValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { imageUpload } from "../services";

class FederationMember {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", FederationMemberController.allFederationMember);
        this.router.delete("/delete/:id", FederationMemberController.deleteFederationMember);
        this.router.get("/all/user", FederationMemberController.getFederationMemberForUser);
    }
    postRoutes() {
        this.router.post(
            "/create",
            imageUpload.single("image"),
            FederationMemberValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            FederationMemberController.createFederationMember
        );
    }
}
export const FederationMemberRoutes = new FederationMember().router;
