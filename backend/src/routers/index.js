import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { LoginController } from "../controllers/LoginController.js";
import authenticate from "../middlewares/authenticate.js";
import authorization from "../middlewares/authorization.js";

const router = Router();
const userController = new UserController();
const loginController = new LoginController();

// Rota de autenticação (pública)
router.post("/login", loginController.login);

// Rotas de usuários
router.get("/usuarios", authorization, userController.findAllUsers);
router.get("/usuario/:id", authenticate, userController.findUser);
router.post("/usuarios", userController.saveUser);
router.put("/usuario/:id", authenticate, userController.updateUser);
router.delete("/usuario/:id", authenticate, userController.deleteUser);

export { router };
