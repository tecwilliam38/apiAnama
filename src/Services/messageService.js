import repoMessage from "../repositories/repoMessage.js";


const createMessage = async (messageData) => {
    // Aqui você pode validar dados, aplicar regras, etc.
    return await repoMessage.SendMessages(messageData);
};
export default { createMessage }