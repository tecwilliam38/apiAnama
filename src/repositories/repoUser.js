import pool from "../database/db.js";


async function VerificaEmailExistente(user_email) {
    try {
        const query = 'SELECT count(*) FROM anama_user WHERE user_email = $1';
        const result = await pool.query(query, [user_email]);
        return parseInt(result.rows[0].count) > 0;
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        throw error;
    }
}
async function CadastroUser(
    user_email, user_name, user_cel_phone, endereco, password
) {
    const emailJaExiste = await VerificaEmailExistente(user_email);
    if (emailJaExiste) {
        console.log('Email já cadastrado.');
        return [];
    }

    const insertQuery = `
        INSERT INTO anama_user (
            user_email, user_name, user_cel_phone, endereco, password,
            created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
        RETURNING id_user
    `;

    try {
        const result = await pool.query(insertQuery, [
            user_email, user_name, user_cel_phone, endereco, password
        ]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir:', error);
        throw error;
    }
}

async function LoginUser(user_email) {
    let sql = `select * from anama_user where user_email = $1`;
    try {
        const user = await pool.query(sql, [user_email]);
        if (user.length == 0)
            return [];
        else
            return user.rows[0];
    } catch (err) {
        console.log(err);
    }
}
async function ProfileUser(id_user) {

    let sql = `SELECT 
         au.id_user, 
         au.user_name AS nome, 
         au.user_email, 
         au.user_cel_phone AS telefone,
         au.password as password,
       FROM anama_user AS au 
       WHERE ad.id_user = $1`;

    const userProfile = await pool.query(sql, [id_user]);

    return userProfile.rows[0];
}

async function EditarUser(id_user, user_name, user_email, password,
    endereco, user_cel_phone, updated_at) {

    let sql = `update anama_user set user_name=$1, user_email=$2, password=$3, endereco=$4,
     user_cel_phone=$7, updated_at= current_timestamp
     where id_user = $11`;

    await pool.query(sql, [user_name, user_email, password,
        endereco, user_cel_phone]);
    return { id_user };
}
const getFriendsByUserId = async (userId) => {
    const query = `
     SELECT u.id_user, u.user_name, u.user_email
    FROM anama_friendships f
    JOIN anama_user u ON u.id_user = f.friend_id
    WHERE f.id_user = $1
  `;

    const { rows } = await pool.query(query, [userId]);
    return rows;
};

const insertFriendship = async (id_user, friend_id) => {
    const query = `
    INSERT INTO anama_friendships (id_user, friend_id)
    VALUES 
      ($1, $2),
      ($2, $1)
    ON CONFLICT DO NOTHING
  `;
    await pool.query(query, [id_user, friend_id]);
};

const findByEmailOrPhone = async (contact) => {
  const isPhone = /^\d+$/.test(contact); // verifica se é só número
  const query = `
    SELECT id_user, user_name, user_cel_phone FROM anama_user
    WHERE user_email = $1 OR user_cel_phone = $2
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [
    contact, 
    // O 10aqui abaixo indica que é sistema Decimal, se fosse binário seria "2"
    isPhone ? parseInt(contact, 10) : null
  ]);
  return rows[0];
};

const insertFriendshipByemail = async (id_user, friend_id) => {
    const query = `
    INSERT INTO anama_friendships (id_user, friend_id)
    VALUES ($1, $2), ($2, $1)
    ON CONFLICT DO NOTHING
  `;
    await pool.query(query, [id_user, friend_id]);
};

function findFriendsByRequesterId(userId) {
  const query = `
    SELECT u.*, f.friend_id
    FROM anama_friendships f
    JOIN anama_user u ON u.id_user = f.friend_id
    WHERE f.id_user = $1
    ORDER BY f.created_at DESC

  `;
  return pool.query(query, [userId]).then(res => res.rows);
}
// function findFriendsByRequesterId(userId) {
//   const query = `
//     SELECT u.id_user, u.user_name as friendName, 
//     u.user_email as friendEmail, 
//     u.user_cel_phone as friendContact,
//      f.friend_id
//     FROM anama_friendships f
//     JOIN anama_user u ON u.id_user = f.friend_id
//     WHERE f.id_user = $1
//     ORDER BY f.created_at DESC
//   `;
//   return pool.query(query, [userId]).then(res => res.rows);
// }



export default {
    CadastroUser,
    ProfileUser,
    LoginUser,
    EditarUser,
    getFriendsByUserId,
    insertFriendship,
    findByEmailOrPhone,
    insertFriendshipByemail,
    findFriendsByRequesterId
};