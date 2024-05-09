import { Router, Request, Response } from "express";
import UserRouter from "../domain/users/UserRouter";
import EmailRouter from "../domain/email/EmailRouter";
import AdminRouter from "../domain/admin/AdminRouter";

const router = Router();

router.use("/user", UserRouter)

router.use("/admin", AdminRouter)

router.use("/email", EmailRouter)

export default router;