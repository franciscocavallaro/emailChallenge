import { Router, Request, Response } from "express";
import UserRouter from "../domain/users/UserRouter";
import EmailRouter from "../domain/email/EmailRouter";

const router = Router();

router.use("/user", UserRouter)

router.use("/admin", (req: Request, res: Response) => {
    res.json({ message: "Hello from server!" });
});

router.use("/email", EmailRouter)

export default router;