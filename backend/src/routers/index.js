import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.get("/usuarios", userController.findAllUsers);

router.post("/usuarios", userController.saveUser);

router.put("/usuario/:id", userController.updateUser);

router.delete("/usuario/:id", userController.deleteUser);

export { router };
