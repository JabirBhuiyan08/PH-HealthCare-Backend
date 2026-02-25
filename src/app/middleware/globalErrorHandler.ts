import { NextFunction, Request, Response } from "express"
import { envVars } from "../../config/env"
import status from "http-status"
import z from "zod";
import { TErrorResponse, TErrorSource } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handleZodError";
import AppError from "../errorHelpers/AppError";



// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = ((err:any, req:Request, res:Response , next:NextFunction) =>{
  if(envVars.NODE_ENV === 'Development'){

      console.log("Error From Global Error Handler")
  }

  let errorSource : TErrorSource[] = []
  let statusCode : number = status.INTERNAL_SERVER_ERROR;
  let message: string = 'Internal Server error'
  let stack: string | undefined = undefined;

  if(err instanceof z.ZodError){
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSource = [...simplifiedError.errorSources]
  }
  else if(err instanceof AppError){
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSource = [{
      path: "",
      message: err.message
    }]
  }
  else if(err instanceof Error){
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSource = [{
      path: "",
      message: err.message
    }]
  }

  const errorResponse : TErrorResponse = {
    success:false,
    message: message,
    errorSource,
    error: envVars.NODE_ENV === 'Development' ? err : undefined,
    stack: envVars.NODE_ENV === 'Development' ? stack : undefined,
  }

  res.status(statusCode).json(errorResponse)
})