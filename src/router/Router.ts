import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to our API!" });
});

router.get("/hello", (req: Request, res: Response) => {
    res.json({ message: "Hello from server!" });
});

export default router;