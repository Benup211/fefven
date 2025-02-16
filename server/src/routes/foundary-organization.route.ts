import { Router } from "express";
import { FoundaryOrganizationController } from "../controllers";
import { FoundaryOrganizationValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";

class FoundaryOrganization {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", FoundaryOrganizationController.allOrganizations);
        this.router.delete("/delete/:id", FoundaryOrganizationController.deleteOrganization);
    }
    postRoutes() {
        this.router.post(
            "/create",
            FoundaryOrganizationValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            FoundaryOrganizationController.createOrganization
        );
    }
}
export const FoundaryOrganizationRoutes = new FoundaryOrganization().router;