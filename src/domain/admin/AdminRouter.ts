import { Router } from "express";
import {AdminController} from "./controller/implementations/AdminController";
import {AdminService} from "./service/implementations/AdminService";
import {AdminRepository} from "./repository/implementations/AdminRepository";
import {PrismaClient} from "@prisma/client";

const adminRouter = Router();

const prismaClient = new PrismaClient();
const adminRepository = new AdminRepository(prismaClient);
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

adminRouter.get("/stats", async (req, res) => adminController.getStats(req, res));

export default adminRouter;