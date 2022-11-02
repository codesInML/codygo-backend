require("dotenv").config();

import "express-async-errors";

// initialize the express app
import express, { Application, Request, Response } from "express";
const app: Application = express();

// security middleware
import helmet from "helmet";
import cors from "cors";
import rateLimiter from "express-rate-limit";
const xssClean = require("xss-clean");

// application middleware
import { applicationRoutes } from "./routes";
import { errorHandlerMiddleware, notFound } from "./middleware";

// use security middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(xssClean());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 60 }));

// home route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Codygo API");
});

app.use("/api/v1", applicationRoutes);

// not found middleware
app.use(notFound);

// error handler middleware
app.use(errorHandlerMiddleware);

export default app;
