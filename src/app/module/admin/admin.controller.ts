import { Request, Response } from "express";
import { AdminService } from "./admin.service"
import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";

const getAllAdmins = catchAsync( async (req: Request, res: Response) => {
    const result = await AdminService.getAllAdmins();

    sendResponse(res,{
        httpStatusCode: status.OK,
        success: true,
        message: "Admins retrieved Successfully",
        data: result
    })
}
)

const getAdminById = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;
    const admin = await AdminService.getAdminById(id as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin retrieved Successfully",
        data: admin
    })
})

const updateAdmin = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;
    const payload = req.body;

    const updatedAdmin = await AdminService.updateAdmin(id as string, payload);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin updated Successfully",
        data: updatedAdmin
    })
})

const deleteAdmin = catchAsync( async (req: Request, res: Response) => {
    const {id} = req.params;
    const payload = req.body;

    const updatedAdmin = await AdminService.deleteAdmin(id as string, payload);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Admin deleted Successfully",
        data: updatedAdmin
    })
})

export const AdminController = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}