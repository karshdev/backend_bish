
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as addressController from "./address.controller";
import * as addressValidation from "./address.validation";
import { roleAuth } from "../common/middleware/role-auth.middleware";

const router = Router();

router
        .get("/", addressController.getAddress)
        // .get("/:id", addressController.getUserById)
        // .delete("/:id", addressController.deleteUser)
        .post("/",roleAuth("ADMIN"),addressValidation.createAddress, catchError, addressController.createAddress)
        // .put("/:id", addressValidation.createAddress, catchError, addressController.)

export default router;

