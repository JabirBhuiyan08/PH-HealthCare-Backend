/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { cookieUtils } from "../utils/cookie";
import { prisma } from "../lib/prisma";
import AppError from "../errorHelpers/AppError";
import status from "http-status";
import { envVars } from "../../config/env";
import { jwtUtils } from "../utils/jwt";

export const checkAuth =(...authRoles: Role[])=> async (req: Request, res: Response, next: NextFunction) =>{
    try {
        //session token verification
        const sessionToken = cookieUtils.getCookie(req, "better-auth.session.token");
        if(!sessionToken){
            throw new Error("Unauthorized: No session token found");
        }
        if(sessionToken){
            const sessionExists = await prisma.session.findFirst({
                where:{
                    token: sessionToken,
                    expiresAt: {
                        gt: new Date(),
                    }
                },
                include:{
                    user: true,
                }
            })
            if(sessionExists && sessionExists.user){
                const user = sessionExists.user;

                const now = new Date();
                const exporesAt = new Date(sessionExists.expiresAt);
                const createdAt = new Date(sessionExists.createdAt);

                const sessionDuration = exporesAt.getTime() - createdAt.getTime();
                const timeRemaining = exporesAt.getTime() - now.getTime();
                const percentRemaining = (timeRemaining / sessionDuration) * 100;

                if(percentRemaining < 20){
                    res.setHeader("X-Session-Expiring", "true");
                    res.setHeader("X-Session-Expires-In", exporesAt.toISOString());
                    res.setHeader("X-Session-Time-Remaining", timeRemaining.toString());

                    console.log("session Expire Soon!!")
                }

                if(user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED){
                    throw new AppError(status.UNAUTHORIZED,"Unauthorized: User is not Active");
                }

                if(user.isDeleted){
                    throw new AppError(status.UNAUTHORIZED,"Unauthorized: User is Deleted");
                }

                if(authRoles.length > 0 && !authRoles.includes(user.role)){
                    throw new AppError(status.FORBIDDEN, "Forbidden: You do not have permission to access this resource");
                }

                return next();
            }
            const accessToken = cookieUtils.getCookie(req, "accessToken");
            if(!accessToken){
                throw new AppError(status.UNAUTHORIZED, "Unauthorized: Access token is missing");
            }


        }


//access token verification
    const accessToken = cookieUtils.getCookie(req, "accessToken");
    if(!accessToken){
        throw new AppError(status.UNAUTHORIZED, "Unauthorized: Access token is missing");
    }

    const verifiedToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);

        if(!verifiedToken.success){
            throw new AppError(status.UNAUTHORIZED, "Unauthorized: Invalid access token");
        }

        if(authRoles.length > 0 && !authRoles.includes(verifiedToken.data!.role as Role)){
            throw new AppError(status.FORBIDDEN, "Forbidden: You do not have permission to access this resource");
        }

    next();
    } catch (error: any) {
        next(error)
    }
}