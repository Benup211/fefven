import { Router } from "express";
import { OrganizationController } from "../controllers";
import { OrganizationValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";

class Organization {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", OrganizationController.allOrganizations);
        this.router.delete("/delete/:id", OrganizationController.deleteOrganization);
    }
    postRoutes() {
        this.router.post(
            "/create",
            OrganizationValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            OrganizationController.createOrganization
        );
    }
}
export const OrganizationRoutes = new Organization().router;
