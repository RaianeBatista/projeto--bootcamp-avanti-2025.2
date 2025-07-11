import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { LoginController } from "../controllers/LoginController.js";
import authenticate from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";

const router = Router();
const userController = new UserController();
const loginController = new LoginController();

router.get("/usuarios", authorization, userController.findAllUsers);

router.post("/usuarios", userController.saveUser);

router.put("/usuario/:id", userController.updateUser);

router.delete("/usuario/:id", userController.deleteUser);

router.post("/login", loginController.login)

export { router };
