import { Router } from "express";
import { OrganizationMemberController } from "../controllers";
import { OrganizationMemberValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";

class OrganizationMember {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all/:id", OrganizationMemberController.getOrganizationMembers);
        this.router.delete("/delete/:id", OrganizationMemberController.deleteOrganizationMember);
    }
    postRoutes() {
        this.router.post(
            "/create",
            OrganizationMemberValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            OrganizationMemberController.createOrganizationMember
        );
    }
}
export const OrganizationMemberRoutes = new OrganizationMember().router;
