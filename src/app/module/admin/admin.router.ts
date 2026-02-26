import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/",checkAuth(Role.SUPER_ADMIN, Role.ADMIN), AdminController.getAllAdmins)
router.get("/:id",checkAuth(Role.SUPER_ADMIN, Role.ADMIN), AdminController.getAllAdminById)
router.patch("/:id",checkAuth(Role.SUPER_ADMIN, Role.ADMIN), AdminController.updateAdmin)
router.delete("/:id",checkAuth(Role.SUPER_ADMIN, Role.ADMIN), AdminController.deleteAdmin)



export const AdminRoutes = router;