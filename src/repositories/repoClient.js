import pool from "../database/db.js";


async function InserirClient(
    client_name, client_sector, endereco, phone_contato, created_at, updated_at
) {
    try {
        const clientExiste = await verificaClientExiste(client_name);
        if (clientExiste) {
            console.log('Client já cadastrado.');
            return { erro: 'Client já cadastrado' };
        }
        const sqlInsert = `
            INSERT INTO anama_client (client_name, client_sector, cidade, endereco, phone_contato, created_at, updated_at)
            VALUES ($1, $2, $3, $4, current_timestamp, current_timestamp)
            RETURNING id_client;
        `;

        const result = await pool.query(sqlInsert, [
            client_name, client_sector, endereco, phone_contato
        ]);

        return result.rows[0]; // Retorna o cliente inserido com id_client
    }
    catch (error) {
        console.error('Erro ao inserir cliente:', error.message);
        return { erro: 'Erro interno ao cadastrar cliente' };
    }
}

async function ListarClient() {

    let sql = `select id_client, client_name, client_sector as setor, endereco, 
    phone_contato, email from anama_client order by client_name`;
    const clients = await pool.query(sql, []);
    return clients.rows;
}

async function ListarClientId(id_client) {

    let sql = `select id_client, client_name, client_sector as setor, endereco, 
     phone_contato from anama_client  
    where id_client = $1`;

    const client = await pool.query(sql, [id_client]);
    return client.rows[0];
}

export default {
    InserirClient,
    ListarClientId,
    ListarClient
}