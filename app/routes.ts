import express from "express";
import userRoutes from "./user/user.route";

import addressRoutes from "./address/address.route";

import adminRoutes from "./admin/admin.route";

// routes
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/address", addressRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", userRoutes);

export default router;