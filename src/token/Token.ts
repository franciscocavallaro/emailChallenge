import * as jwt from "jsonwebtoken";
import {User} from "@prisma/client";
import {NextFunction, Request, Response} from "express";

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
                const decoded = jwt.verify(token, secret) as { id: number, email: string, role: string };
                (req as any).role = decoded.role;
                next();
            } catch (error) {
                res.status(401).json({error: "Unauthorized"});
            }
        }
    }
}