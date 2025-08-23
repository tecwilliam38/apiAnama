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

export default {postMessage};