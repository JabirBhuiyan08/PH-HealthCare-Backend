import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.router";
import { UserRoutes } from "../module/user/user.router";
import { DoctorRoutes } from "../module/doctor/doctor.route";

const router = Router()

router.use("/auth", AuthRoutes)
router.use("/specialties", SpecialtyRoutes)
router.use("/users", UserRoutes)
router.use("/doctors", DoctorRoutes)

export const IndexRoutes = router