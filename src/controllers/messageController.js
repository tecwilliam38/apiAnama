import messageService from "../Services/messageService.js";


const postMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, message_text } = req.body;
    const message = await messageService.createMessage({ sender_id, receiver_id, message_text });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMessages = async (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'Parâmetros user1 e user2 são obrigatórios' });
  }

  try {
    const messages = await messageService.FetchMessages(user1, user2);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function sendMessageHandler(req, res) {
  try {
    const { id_user, friend_id, message_text } = req.body;
    // const id_user = req.user.id;

    const message = await messageService.sendMessage({ id_user, friend_id, message_text });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getConversationHandler(req, res) {
  try {
    const id_user = req.user.id; // vem do token via middleware
    const friend_id =            
      parseInt(req.params.friend_id);

       if (!friend_id) {
      return res.status(400).json({ error: 'friend_id é obrigatório' });
    }

    const messages = await messageService.getConversation(id_user, friend_id);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

export default {
  sendMessageHandler,
  getConversationHandler,
  postMessage,
  getMessages
};