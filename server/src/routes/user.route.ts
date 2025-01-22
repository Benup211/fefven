import { Router } from "express";
import { UserController } from "../controllers";
import { GlobalMiddleware } from "../middleware";
import { UserValidator } from "../validators";
class GeneralUser {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/logout",GlobalMiddleware.CheckAuth,UserController.logout);
        this.router.get("/checkAuth",GlobalMiddleware.CheckAuth,UserController.checkAuth);
    }
    postRoutes() {
        this.router.post("/login",UserValidator.login(),GlobalMiddleware.CheckValidationResult,UserController.login);
    }
}
export const UserRoutes = new GeneralUser().router;
