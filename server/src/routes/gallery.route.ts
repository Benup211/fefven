import { Router } from "express";
import { GalleryController } from "../controllers";
import { GalleryValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { imageUpload } from "../services";

class Gallery {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", GalleryController.allGallery);
        this.router.delete("/delete/:id", GalleryController.deleteGallery);
    }
    postRoutes() {
        this.router.post(
            "/create",
            imageUpload.single("file"),
            GalleryValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            GalleryController.createGallery
        );
    }
}
export const GalleryRoutes = new Gallery().router;
