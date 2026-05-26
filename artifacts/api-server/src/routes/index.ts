import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingsRouter from "./bookings";
import checkoutRouter from "./checkout";
import adminRouter from "./admin";
import configRouter from "./config";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/bookings", bookingsRouter);
router.use("/checkout", checkoutRouter);
router.use("/admin", adminRouter);
router.use("/config", configRouter);

export default router;
