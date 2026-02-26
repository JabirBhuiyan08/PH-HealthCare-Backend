import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), DoctorController.getAllDoctor);
router.get("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), DoctorController.getDoctorById);
router.patch("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), DoctorController.updateDoctor);
router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), DoctorController.deleteDoctor);


export const DoctorRoutes = router;