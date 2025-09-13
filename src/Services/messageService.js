import { createClient } from "@supabase/supabase-js";
import repoMessage, { saveMessage } from "../repositories/repoMessage.js";

const URL = "https://yulykztzhmoxfztykeop.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bHlrenR6aG1veGZ6dHlrZW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUyNjAsImV4cCI6MjA2NjE5MTI2MH0.sFnTOu8fRgkycEZatgy4eVK-SyRjyrKKUChdByoiy1c";

const supabase = createClient(URL, KEY);


const createMessage = async (messageData) => {
  // Aqui você pode validar dados, aplicar regras, etc.
  return await repoMessage.SendMessages(messageData);
};

async function sendMessage(data) {
  return await repoMessage.createMessage(data);
}

async function getConversation( sender_id, receiver_id) {
  return await repoMessage.getMessages(  sender_id, receiver_id);
}

const sendMessageZap = async (data) => {
  const message = await saveMessage(data);
  // Aqui você pode adicionar lógica de notificação, webhook, etc.
  return message;
};

const createInteraction = async (data) => {
  return await repoMessage.insertInteraction(data);
};



export default { 
  sendMessage,
  getConversation,
  createMessage,
  sendMessageZap,
  createInteraction
};