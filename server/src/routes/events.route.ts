import { Router } from "express";
import { EventsController } from "../controllers";
import { EventValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";

class Events {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", EventsController.allEvents);
        this.router.delete("/delete/:id", EventsController.deleteEvents);
    }
    postRoutes() {
        this.router.post(
            "/create",
            EventValidator.create(),
            GlobalMiddleware.CheckValidationResult,
            EventsController.createEvents
        );
    }
}
export const EventsRoutes = new Events().router;
