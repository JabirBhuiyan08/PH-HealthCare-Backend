import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { SpecialtyService } from "./specialty.service";





const createSpecialty = catchAsync(
    async(req:Request, res:Response) =>{
        const payload = req.body;
        const result = await SpecialtyService.createSpecialty(payload);
        sendResponse(res,{
            httpStatusCode: 201,
            success: true,
            message: "Specialty creted Successfully",
            data: result
        })
    }
)


const getAllSpecialties = catchAsync (
    async (req: Request, res: Response) =>{
        const result =  await SpecialtyService.getAllSpecialties();
        sendResponse(res,{
            httpStatusCode: 201,
            success: true,
            message: "get all Specialty Successfully",
            data: result
        })
    }
)

const deleteSpecialty = catchAsync (
    async (req: Request, res: Response) =>{
        const {id} = req.params;
        const result = await SpecialtyService.deleteSpecialty(id as string);
        sendResponse(res,{
            httpStatusCode: 201,
            success: true,
            message: "Delete Specialty Successfully",
            data: result
        })
    }
)


export const SpecialtyController ={
    createSpecialty,
    getAllSpecialties,
    deleteSpecialty
}