import { Router } from "express";
import { NewsController } from "../controllers";
import { NewsValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { imageUpload } from "../services";

class News {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", NewsController.allNews);
        this.router.delete("/delete/:id", NewsController.deleteNews);
        this.router.get("/:id", NewsController.getNews);
    }
    postRoutes() {
        this.router.post(
            "/create",
            imageUpload.single("file"),
            NewsValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            NewsController.createNews
        );
    }
}
export const NewsRoutes = new News().router;
