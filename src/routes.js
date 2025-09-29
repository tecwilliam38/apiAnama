import { Router } from "express";
import userController from "./controllers/userController.js";
import jwt from "./token.js"
import messageController, { sendMessage } from "./controllers/messageController.js";
import multer from "multer";
import clientController from "./controllers/clientController.js";
import agendaController from "./controllers/agendaController.js";


const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
const uploadmedia = multer();

// Rotas Usuários
router.post("/user/register", userController.CadastroUser);
router.post("/user/login", userController.LoginUser);
router.get("/user/profile/:id_user", userController.ProfileUser);
router.put("/user/:id_user", jwt.ValidateToken, userController.EditarUsuario);
router.post('/users/friends/add', jwt.ValidateToken, userController.addFriend);
router.get('/users/friends', jwt.ValidateToken, userController.getFriends);
router.post('/friends/contact', jwt.ValidateToken, userController.addFriendByContact);

// Rotas Clients
router.post("/client/register", jwt.ValidateToken, clientController.InserirClient);
router.get("/client/listar", jwt.ValidateToken, clientController.ListarClient);
router.get("/client/listar/:id_client", jwt.ValidateToken, clientController.ListarClientId);
router.post('/client/agendamentos', jwt.ValidateToken, agendaController.InsertAgenda);
router.get('/client/agendamentos', jwt.ValidateToken, agendaController.ListarServicos);


// Rotas Posts
router.post('/messages/send', jwt.ValidateToken, messageController.postMessage);
router.post('/send', messageController.handleSendMessage);
router.post('/reactions', messageController.handleCreateInteraction);
router.get('/messages/friends/:userId', jwt.ValidateToken, userController.ListMyFriendsHandler);
// Enviar mensagem
router.post('/messages/', jwt.ValidateToken, messageController.sendMessageHandler);
// Buscar conversa com um amigo essa funciona
router.get('/messages/users/:receiver_id', jwt.ValidateToken, messageController.getMessagesUsers);

export default router;