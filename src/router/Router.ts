import { Router, Request, Response } from "express";
import UserRouter from "../domain/users/UserRouter";

const router = Router();

router.use("/user", UserRouter)

router.use("/admin", (req: Request, res: Response) => {
    res.json({ message: "Hello from server!" });
});

export default router;