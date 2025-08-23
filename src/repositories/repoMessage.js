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

//     const query = `INSERT INTO anama_messages (sender_id, receiver_id, text)
//     VALUES ($1, $2, $3)
//     RETURNING *;
//   `;
//     const values = [sender_id, receiver_id, message_text];

//     const result = await pool.query(query, values);
//     return result.rows[0];

export default {SendMessages};