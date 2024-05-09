import * as jwt from "jsonwebtoken";
import {User} from "@prisma/client";
import {NextFunction, Request, Response} from "express";
import {UserRequest} from "../utils/UserUtils";

export class Token {

    public static generateToken(data: User): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const payload = {
            id: data.id,
            email: data.email,
            role: data.role
        }
        return jwt.sign(payload, secret, {expiresIn: "1h"});
    }


    public static verifyToken() {
        return (req: Request, res: Response, next: NextFunction): void => {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET is not defined in the environment variables");
            }
            try {
                const token = req.headers.authorization?.split(" ")[1];
                if (!token) {
                    res.status(401).json({error: "Unauthorized"});
                    return;
                }
                (req as any as UserRequest).user = jwt.verify(token, secret) as {
                    id: number,
                    email: string,
                    role: string
                }; // Attach the decoded token to the request object
                next();
            } catch (error) {
                res.status(401).json({error: "Unauthorized"});
            }
        }
    }
}