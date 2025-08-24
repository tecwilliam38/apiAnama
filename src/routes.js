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
router.post('/users/friends', jwt.ValidateToken, userController.addFriend);
router.get('/users/friends', jwt.ValidateToken, userController.getFriends);
router.post('/friends/contact', jwt.ValidateToken, userController.addFriendByContact);

// Rotas Admin

// Rotas Posts
router.post('/messages/send', jwt.ValidateToken, messageController.postMessage);
router.get('/messages/get', jwt.ValidateToken, messageController.getMessages);
router.get('/messages/:userId',jwt.ValidateToken,userController.listMyFriendsHandler);
router.post('/messages/put', jwt.ValidateToken, messageController.sendMessageHandler);
// Buscar conversa com um amigo
router.get('/messages/get/:friend_id', jwt.ValidateToken, getConversationHandler);



export default router;