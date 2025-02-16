import { Router } from "express";
import { FoundaryOrganizationMemberController } from "../controllers";
import { FoundaryOrganizationMemberValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";

class FoundaryOrganizationMember {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all/:id", FoundaryOrganizationMemberController.getOrganizationMembers);
        this.router.delete("/delete/:id", FoundaryOrganizationMemberController.deleteOrganizationMember);
    }
    postRoutes() {
        this.router.post(
            "/create",
            FoundaryOrganizationMemberValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            FoundaryOrganizationMemberController.createOrganizationMember
        );
    }
}
export const FoundaryOrganizationMemberRoutes = new FoundaryOrganizationMember().router;
