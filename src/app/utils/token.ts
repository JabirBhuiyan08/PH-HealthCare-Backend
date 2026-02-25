import { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { jwtUtils } from "./jwt";
import { cookieUtils } from "./cookie";
import { Response } from "express";


const getAccessToken = (payload: JwtPayload)=>{
    const token = jwtUtils.createToken(payload, envVars.ACCESS_TOKEN_SECRET, 
        {expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN} as SignOptions);

    return token;
}

const getRefreshToken = (payload: JwtPayload) =>{
    const refreshToken = jwtUtils.createToken(payload, envVars.REFRESH_TOKEN_SECRET, 
        {expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN} as SignOptions);

    return refreshToken;
}

const setAccessTokenCookie = (res: Response, token: string) =>{
 
    cookieUtils.setCookie(res, "accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge:  60 *60 * 60 *24, // 24 hours in seconds
    })
}

const setRefreshTokenCookie = (res: Response, token: string) =>{

    cookieUtils.setCookie(res, "refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge:  60 *60 * 60 *24 * 7, // 7 days in seconds
    })
}


const setBetterAuthSessionCookies = (res: Response, token: string) =>{

    cookieUtils.setCookie(res, "better-auth.session.token", token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge:  60 *60 * 60 *24,
    })

}



export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthSessionCookies
}