import { Router } from "express";
import { ResourceController } from "../controllers";
import { ResourceValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { fileUpload } from "../services";

class Resource {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", ResourceController.allResource);
        this.router.delete("/delete/:id", ResourceController.deleteResource);
    }
    postRoutes() {
        this.router.post(
            "/create",
            fileUpload.single("file"),
            ResourceValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            ResourceController.createResource
        );
    }
}
export const ResourceRoutes = new Resource().router;
