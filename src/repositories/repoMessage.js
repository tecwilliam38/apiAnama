import pool from "../database/db.js"

async function SendMessages({ sender_id, receiver_id, message_text }) {
  const query = `
    INSERT INTO anama_messages (sender_id, receiver_id, message_text)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [sender_id, receiver_id, message_text];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw new Error('Não foi possível enviar a mensagem');
  }

}

async function getMessages(sender_id,receiver_id) {

  const query = `
     SELECT 
      m.id,
       m.sender_id as userid,
      m.message_text as mensagens,
      m.created_at as enviadas,
      sender.user_name AS usuario,
      receiver.user_name AS amigo      
    FROM anama_messages m
    JOIN anama_user sender ON sender.id_user = m.sender_id
    JOIN anama_user receiver ON receiver.id_user = m.receiver_id
    WHERE (m.sender_id = $1 AND m.receiver_id = $2)
       OR (m.sender_id = $2 AND m.receiver_id = $1)
    ORDER BY m.created_at ASC
  `;  
  const result = await pool.query(query, [sender_id,receiver_id]);
  return result.rows;
}

async function createMessage({ sender_id, receiver_id, message_text }) {
  const query = `
    INSERT INTO anama_messages (sender_id, receiver_id, message_text, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const result = await pool.query(query, [sender_id, receiver_id, message_text]);
  return result.rows[0];
}
// TEste de api AnamaZap
export const saveMessage = async ({ from, to, message_text }) => {
  const query = `
    INSERT INTO anama_messages (sender_id, receiver_id, message_text, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [from, to, message_text];
  const result = await pool.query(query, values);
  return result.rows[0];
};




export default {
  getMessages,
  createMessage,
  SendMessages,  
  saveMessage
};