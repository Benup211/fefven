import { Router } from "express";
import { DashboardController } from "../controllers";

class Dashboard {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/all", DashboardController.allItemCount);
    }
    postRoutes() {
    }
}
export const DashboardRoutes = new Dashboard().router;
