import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import errorHandler from "#middlewares/errorHandler";
import ResponseService from "#services/core/response";

import publicRouterV1 from "#routes/public/api/v1/index";
import internalRouterV1 from "#routes/internal/api/v1/index";
import DB from "#database/connection";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// init DB
DB.init();
DB.connect().then(() => {
  console.log("Database connection successful");
}).catch(err => {
  console.log(err);
});

app.use("/public/api/v1", publicRouterV1);
app.use("/internal/api/v1", internalRouterV1);

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Angular static files
const angularDistPath = path.join(__dirname, "Angular-Movies", "dist", "angular-movies", "browser");
app.use(express.static(angularDistPath));

// Serve index.html for any non-API routes (Angular routing fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

app.use((req, res, next) => {
  return ResponseService.error(res, "Route not found", "NOT_FOUND", 404);
});

// Middleware for global error handeling
app.use(errorHandler);

export default app;
