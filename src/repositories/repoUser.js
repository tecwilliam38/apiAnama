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



export default { CadastroUser, ProfileUser, LoginUser, EditarUser };