import { createClient } from "@supabase/supabase-js";
import repoMessage from "../repositories/repoMessage.js";

const URL = "https://yulykztzhmoxfztykeop.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bHlrenR6aG1veGZ6dHlrZW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUyNjAsImV4cCI6MjA2NjE5MTI2MH0.sFnTOu8fRgkycEZatgy4eVK-SyRjyrKKUChdByoiy1c";

const supabase = createClient(URL, KEY);


const createMessage = async (messageData) => {
  // Aqui você pode validar dados, aplicar regras, etc.
  return await repoMessage.SendMessages(messageData);
};
const FetchMessages = async (user1, user2) => {
  return await repoMessage.GetMessagesBetweenUsers(user1, user2);
};

async function UploadImage(file, auth_uid) { 
  if (!file) throw new Error('Imagem ausente');

  const id_user = await repoMessage.getUserIdByAuthUid(auth_uid);
  if (!id_user) throw new Error('Usuário não encontrado');

  const fileName = `${Date.now()}_${file.originalname}`;
  const { error: uploadError } = await supabase.storage
    .from('posts')
    .upload(fileName, file.buffer, { contentType: file.mimetype });

  if (uploadError) throw uploadError;

  const { publicUrl } = supabase.storage
    .from('posts')
    .getPublicUrl(fileName).data;

  await repoMessage.SaveImageUrl(id_user, publicUrl);

  return publicUrl;
}



export default { createMessage, FetchMessages, UploadImage }