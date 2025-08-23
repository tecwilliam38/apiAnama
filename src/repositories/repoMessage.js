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

async function GetMessagesBetweenUsers (user1, user2){
  const query = `
    SELECT * FROM anama_messages
    WHERE (sender_id = $1 AND receiver_id = $2)
       OR (sender_id = $2 AND receiver_id = $1)
    ORDER BY created_at ASC;
  `;
  const values = [user1, user2];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar mensagens no banco de dados');
  }
};




export default {SendMessages, GetMessagesBetweenUsers};