import { Router } from "express";
import {AdminController} from "./controller/implementations/AdminController";
import {AdminService} from "./service/implementations/AdminService";
import {AdminRepository} from "./repository/implementations/AdminRepository";
import prisma from "../../../client";

const adminRouter = Router();

const adminRepository = new AdminRepository(prisma);
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

adminRouter.get("/stats", async (req, res) => adminController.getStats(req, res));

export default adminRouter;