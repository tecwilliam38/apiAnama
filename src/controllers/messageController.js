import supabase from "../database/supabaseConfig.js";
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

async function sendMessageHandler(req, res) {
  try {
    const { sender_id, receiver_id, message_text } = req.body;

    const message = await messageService.sendMessage({ sender_id, receiver_id, message_text });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMessagesUsers(req, res) {
  try {
    const sender_id = parseInt(req.user.id_user); // vem do token via middleware
    const receiver_id = parseInt(req.params.receiver_id);

    if (!receiver_id || !sender_id) {
      return res.status(400).json({ error: 'friend_id é obrigatório' });
    }

    const messages = await messageService.getConversation(sender_id, receiver_id);

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const sendMessage = async (req, res) => {
  const { to, text } = req.body;
  const media = req.file;

  try {
    let mediaUrl = null;

    if (media) {
      const { data, error } = await supabase.storage
        .from('anama-media')
        .upload(`messages/${Date.now()}_${media.originalname}`, media.buffer, {
          contentType: media.mimetype,
        });

      if (error) throw error;

      mediaUrl = supabase.storage
        .from('anama-media')
        .getPublicUrl(data.path).publicUrl;
    }

    res.status(200).json({
      status: 'Mensagem enviada',
      to,
      text,
      mediaUrl,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleSendMessage = async (req, res) => {
  const { from, to, message_text } = req.body;

  try {
    const message = await messageService.sendMessageZap({ from, to, message_text });
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleCreateInteraction = async (req, res) => {
  const { messageId, emoji, comment } = req.body;
  const userId = req.user.id;

  try {
    const interaction = await messageService.createInteraction({ messageId, userId, emoji, comment });
    res.status(201).json(interaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export default {
  sendMessageHandler,
  getMessagesUsers,
  postMessage,
  sendMessage,
  handleSendMessage,
  handleCreateInteraction
};