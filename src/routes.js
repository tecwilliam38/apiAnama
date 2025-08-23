import { Router } from "express";
import userController from "./controllers/userController.js";
import jwt from "./token.js"
import messageController from "./controllers/messageController.js";
import multer from "multer";


const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// Rotas Usuários
router.post("/user/register", userController.CadastroUser);
router.post("/user/login", userController.LoginUser);
router.get("/user/profile/:id_user", userController.ProfileUser);
router.put("/user/:id_user", jwt.ValidateToken, userController.EditarUsuario);
router.post('/add/maigo', jwt.ValidateToken,userController.addFriend);


// Rotas Admin

// Rotas Posts
router.post('/messages/send', jwt.ValidateToken, messageController.postMessage);
router.get('/messages/get', jwt.ValidateToken, messageController.getMessages);

export default router;