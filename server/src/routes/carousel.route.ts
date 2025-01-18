import { Router } from "express";
import { CarouselController } from "../controllers";
import { CarouselValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
import { imageUpload } from "../services";

class Carousel {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", CarouselController.allCarousel);
        this.router.delete("/delete/:id", CarouselController.deleteCarousel);
    }
    postRoutes() {
        this.router.post(
            "/create",
            imageUpload.single("file"),
            CarouselValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            CarouselController.createCarousel
        );
    }
}
export const CarouselRoutes = new Carousel().router;
