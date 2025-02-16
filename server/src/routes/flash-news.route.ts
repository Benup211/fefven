import { Router } from "express";
import { FlashNewsController } from "../controllers";
import { FlashNewsValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { imageUpload } from "../services";

class FlashNews {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/all", FlashNewsController.allFlashNews);
        this.router.get("/first", FlashNewsController.getFirstFlashNews);
    }
    postRoutes() {
        this.router.post(
            "/create",
            imageUpload.single("file"),
            FlashNewsValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            FlashNewsController.createFlashNew
        );
    }

    deleteRoutes(){
        this.router.delete("/delete/:id", FlashNewsController.deleteFlashNews);
    }
}
export const FlashNewsRoutes = new FlashNews().router;