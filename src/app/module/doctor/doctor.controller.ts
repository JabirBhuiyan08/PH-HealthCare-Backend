import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";


const getAllDoctor = catchAsync(
    async(req:Request, res:Response) =>{
        const result = await DoctorService.getAllDoctors();
        sendResponse(res,{
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor retrieved Successfully",
            data: result
        })
    }
)

const getDoctorById = catchAsync(
    async(req:Request, res:Response) =>{
        const id = req.params;
        const doctor = await DoctorService.getDoctorById(id as string);
        sendResponse(res,{
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor retrieved Successfully",
            data: doctor
        })
    }
)

const updateDoctor = catchAsync(
    async(req:Request, res:Response) =>{
    const {id} = req.params;
    const payload = req.body;
    
    const updateDoctor = await DoctorService.updateDoctor(id as string, payload);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor updated Successfully",
        data: updateDoctor
    })
    }
)

const deleteDoctor = catchAsync(
    async(req:Request, res:Response) =>{
        const {id} = req.params;
        const deleteDoctor = await DoctorService.deleteDoctor(id as string);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor deleted Successfully",
            data: deleteDoctor
        })
    }
)



export const DoctorController ={
    getAllDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor

}