import * as jwt from "jsonwebtoken";

export class Token {

    public static generateToken(data: any): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        return jwt.sign(data, secret, { expiresIn: "1h" });
    }

    public static verifyToken(token: string): boolean {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        try {
            jwt.verify(token, secret);
            return true;
        } catch (error) {
            return false;
        }
    }
}