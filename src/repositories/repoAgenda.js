import pool from "../database/db.js";

async function InsertAgenda(id_user, id_service, id_client, price, status, booking_datetime) {

    let sql = `insert into anama_appointments(id_user, id_service, id_client,
            price, status, booking_datetime) 
         values($1, $2, $3, $4, $5, $6) returning id_appointment`;

    try {
        const result = await pool.query(sql, [id_user, id_service, id_client, price, status, booking_datetime]);
        return result.rows[0].id_appointment;
    } catch (error) {
        console.error("Erro ao inserir agendamento:", error);
        throw error; // ou return { success: false, error: err.message };
    }
}

async function ListarServicos(id_user, dt_start = null, dt_end = null) {
    let filtro = [id_user]; // começa com id_user como $1
    let index = 2; // próximo índice para filtros de data  
    let sql = `SELECT 
        a.*, 
        c.client_name AS cliente,             
        c.endereco AS endereco,
        c.client_sector AS filial,
        c.cidade AS cidade
        FROM anama_appointments a
        JOIN anama_client c ON a.id_client = c.id_client
        WHERE a.id_user = $1        
`;
    if (dt_start) {
        sql += ` AND a.booking_datetime >= $${index++}`;
        filtro.push(dt_start);
    }

    if (dt_end) {
        sql += ` AND a.booking_datetime <= $${index++}`;
        filtro.push(dt_end);
    }

    sql += ` ORDER BY a.booking_datetime ASC`;

    try {
        const serv = await pool.query(sql, filtro);
        return serv.rows;
    } catch (err) {
        console.log(err);
    }
}

async function Editar(id_appointment, id_user, id_service, id_client, price, status, booking_datetime) {
    const sql = `
        UPDATE anama_appointments
        SET
            id_user = $1,
            id_client = $2,
            id_service = $3,
            price = $4,
            status = $5,
            booking_datetime = $6
        WHERE id_appointment = $7
    `;

    await pool.query(sql, [
        id_user,
        id_client,
        id_service,
        price,
        status,
        booking_datetime,
        id_appointment
    ]);

    return { id_appointment };
}

async function Excluir(id_appointment) {
    const sql = `DELETE FROM anama_appointments WHERE id_appointment = $1`;

    try {
        await pool.query(sql, [id_appointment]);
        return { id_appointment };
    } catch (err) {
        console.error('Erro ao excluir agendamento:', err);
        throw err; // opcional: propaga o erro para tratamento externo
    }
}

export default { InsertAgenda, ListarServicos, Editar, Excluir };

