import pool from "../database/db.js";


async function VerificaEmailExistente(email) {
    try {
        const query = 'SELECT count(*) FROM anama_user WHERE user_email = $1';
        const result = await pool.query(query, [email]);
        return parseInt(result.rows[0].count) > 0;
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        throw error;
    }
}
async function CadastroUser(
    user_email, user_password, user_name, user_cel_phone, endereco,
    created_at, updated_at
) {
    try {
        const emailJaExiste = await verificaEmailExistente(email);
        if (emailJaExiste) {
            console.log('Email já cadastrado.');
            return { erro: 'Email já cadastrado' };
        }
        const sqlInsert = `
            INSERT INTO anama_user ( user_name, endereco, user_cel_phone, user_email, user_password,
             created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
            RETURNING id_user;
        `;

        const result = await pool.query(sqlInsert, [
            user_name, endereco, user_cel_phone, user_email, user_password
        ]);

        return result.rows[0]; // Retorna o cliente inserido com id_client
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        throw error;
    }
}

async function LoginUser(user_email) {
    let sql = `select * from anama_user where user_email = $1`;
    try {
        const userLogin = await pool.query(sql, [user_email]);
        if (userLogin.length == 0)
            return [];
        else
            return userLogin.rows[0];
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
         au.user_password as password,
       FROM anama_user AS au 
       WHERE ad.id_user = $1`;

    const userProfile = await pool.query(sql, [id_user]);

    return userProfile.rows[0];
}

async function EditarUser(id_user, user_name, user_email, user_password,
    endereco, user_cel_phone, updated_at) {

    let sql = `update anama_user set user_name=$1, user_email=$2, user_password=$3, endereco=$4,
     user_cel_phone=$7, updated_at= current_timestamp
     where id_user = $11`;

    await pool.query(sql, [user_name, user_email, user_password,
        endereco, user_cel_phone]);
    return { id_user };
}



export default { CadastroUser, ProfileUser, LoginUser, EditarUser };