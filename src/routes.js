import { Router } from "express";
import userController from "./controllers/userController.js";
import jwt from "./token.js"

const router = Router();

// Rotas Usuários
router.post("/user/register", userController.CadastroUser);
router.post("/user/login", userController.LoginUser);
router.get("/user/profile/:id_user", userController.ProfileUser);
router.put("/user/:id_user", jwt.ValidateToken, userController.EditarUsuario);

// Rotas Admin

// Rotas Posts

export default router;