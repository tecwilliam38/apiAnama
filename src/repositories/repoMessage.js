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

async function SaveImageUrl(id_user, image_url) {
  await pool.query(
    'INSERT INTO anama_images (id_user, image_url, created_at) VALUES ($1, $2, NOW())',
    [id_user, image_url]
  );
}

async function getUserIdByAuthUid(auth_uid) {
  const result = await pool.query(
    'SELECT id_user FROM anama_user WHERE auth_uid = $1',
    [auth_uid]
  );
  return result.rows[0]?.id_user;
}

export default { SendMessages, GetMessagesBetweenUsers, SaveImageUrl, getUserIdByAuthUid };