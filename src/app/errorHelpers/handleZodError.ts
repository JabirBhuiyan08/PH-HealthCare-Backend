import status from "http-status";
import z from "zod";
import { TErrorSource } from "../interfaces/error.interface";

export const handleZodError = (err: z.ZodError) => {
    const statusCode = status.BAD_REQUEST;
    const message = "ZOD Validation Error";

    const errorSources: TErrorSource[] = [];
    
    err.issues.forEach(issue=>{
      errorSources.push({
        path: issue.path.join('=>')||  "unknown",
        message: issue.message
      })
    })

    return{
        success: false,
        message,
        errorSources,
        statusCode
    }
}
