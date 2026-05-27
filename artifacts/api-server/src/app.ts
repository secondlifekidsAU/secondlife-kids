import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes";
import { logger } from "./lib/logger";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Session middleware (for admin auth)
const sessionSecret = process.env["SESSION_SECRET"] ?? "second-life-kids-dev-secret";
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env["NODE_ENV"] === "production",
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    },
  }),
);

// Note: webhook route needs raw body — handled inside checkout router
// Other routes get json/urlencoded body parsing
app.use((req, res, next) => {
  if (req.path === "/api/checkout/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Serve built frontend in production
if (process.env["NODE_ENV"] === "production") {
  const frontendDist = path.resolve(__dirname, "../../second-life-kids/dist/public");
  app.use(express.static(frontendDist));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

export default app;
