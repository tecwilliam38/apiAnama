import pool from "../database/db.js";

async function verificaClientExiste(endereco) {
    try {
        const query = 'SELECT count(*) FROM anama_client WHERE endereco = $1';
        const result = await pool.query(query, [endereco]);
        return parseInt(result.rows[0].count) > 0;
    } catch (error) {
        console.error('Erro ao verificar endereco:', error);
        throw error;
    }
}

async function InserirClient(
    client_name, client_sector, cidade, endereco, phone_contato, created_at, updated_at
) {
    const clientExiste = await verificaClientExiste(endereco);
    if (clientExiste) {
        console.log('Cliente já cadastrado.');
        return { erro: 'Cliente já cadastrado' };
    }
    try {
        const sqlInsert = `
            INSERT INTO anama_client (client_name, client_sector, cidade, endereco, phone_contato, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
            RETURNING id_client;
        `;

        const result = await pool.query(sqlInsert, [
            client_name, client_sector, cidade, endereco, phone_contato
        ]);

        return result.rows[0]; // Retorna o cliente inserido com id_client
    }
    catch (error) {
        console.error('Erro ao inserir cliente:', error.message);
        return { erro: 'Erro interno ao cadastrar cliente' };
    }
}

async function ListarClient() {

    let sql = `select id_client, client_name, client_sector as setor,cidade, endereco, 
    phone_contato from anama_client order by client_name`;
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