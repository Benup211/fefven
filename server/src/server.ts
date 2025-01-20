import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import { CarouselRoutes,GalleryRoutes,ResourceRoutes,EventsRoutes,NewsRoutes,DashboardRoutes } from "./routes";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

export class MainServer {
    public app: express.Application = express();

    constructor() {
        this.setConfiguration();
        this.setRoutes();
        this.handle404Error();
        this.handleClientError();
    }

    async setConfiguration() {
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(cors(
            {
                origin: ["http://localhost:3000","https://unique-squirrel-enormously.ngrok-free.app"],
                credentials: true,
            }
        ));
        this.app.use(
            "/uploads",
            express.static(path.join(__dirname, "../uploads"))
        );
    }

    setRoutes() {
        this.app.use("/api/carousel", CarouselRoutes);
        this.app.use("/api/gallery", GalleryRoutes);
        this.app.use("/api/resource", ResourceRoutes);
        this.app.use("/api/events", EventsRoutes);
        this.app.use("/api/news", NewsRoutes);
        this.app.use("/api/dashboard", DashboardRoutes);
    }

    handle404Error() {
        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                status: 404,
                errorName: "Not Found",
                errorMessage: "API Not Found",
            });
        });
    }

    handleClientError() {
        this.app.use(
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                let errorStatus = (err as any).errorStatus || 500;
                let errorMessage =
                    err.message ||
                    "Something went wrong. Please try again later";
                res.status(errorStatus).json({
                    status: errorStatus,
                    errorName: err.name,
                    errorMessage: errorMessage,
                });
            }
        );
    }
}
