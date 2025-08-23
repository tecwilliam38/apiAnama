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

async function HandleUpload(req, res) {
  try {
    const image_url = await messageService.UploadImage(req.file, req.user.auth_uid);
    res.json({ success: true, image_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}




export default { postMessage, getMessages, HandleUpload };