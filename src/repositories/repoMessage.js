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

async function GetMessagesBetweenUsers(user1, user2) {
  // const query = `
  //   SELECT * FROM anama_messages
  //   WHERE (sender_id = $1 AND receiver_id = $2)
  //      OR (sender_id = $2 AND receiver_id = $1)
  //   ORDER BY created_at ASC;
  // `;
  // const values = [user1, user2];

  // try {
  //   const result = await pool.query(query, values);
  //   return result.rows;
  // } catch (error) {
  //   throw new Error('Erro ao buscar mensagens no banco de dados');
  // }
};


// async function getMessages(id_user, friend_id) {
async function getMessages(sender_id,receiver_id) {

  const query = `
     SELECT 
      m.id,
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

const createMessagess = async (sender_id, receiver_id, content) => {
  // const res = await pool.query(
  //   `INSERT INTO messages (sender_id, receiver_id, content, timestamp) 
  //    VALUES ($1, $2, $3, NOW()) RETURNING *`,
  //   [sender_id, receiver_id, content]
  // );
  // return res.rows[0];
};


async function createMessage({ id_user, friend_id, message_text }) {
  const query = `
    INSERT INTO anama_messages (id_user, friend_id, message_text, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const result = await pool.query(query, [id_user, friend_id, message_text]);
  return result.rows[0];
}

export default {
  getMessages,
  createMessage,
  SendMessages,
  GetMessagesBetweenUsers
};