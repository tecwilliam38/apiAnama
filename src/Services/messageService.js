import repoMessage from "../repositories/repoMessage.js";


const createMessage = async (messageData) => {
    // Aqui você pode validar dados, aplicar regras, etc.
    return await repoMessage.SendMessages(messageData);
};
const FetchMessages = async (user1, user2) => {
  return await repoMessage.GetMessagesBetweenUsers(user1, user2);
};

export default { createMessage, FetchMessages  }