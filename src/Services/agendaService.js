import agendaRepo from '../repositories/repoAgenda.js';

async function InsertAgenda(id_user, id_service, id_client, price, status, booking_datetime) {
    return await agendaRepo.InsertAgenda(id_user, id_service, id_client, price, status, booking_datetime);
}   

async function ListarServicos(id_user, dt_start = null, dt_end = null) {
    return await agendaRepo.ListarServicos(id_user, dt_start, dt_end);
}

async function Editar(id_appointment, id_user, id_service, id_client, price, status, booking_datetime) {
    return await agendaRepo.Editar(id_appointment, id_user, id_service, id_client, price, status, booking_datetime);
}

async function Excluir(id_appointment) {
    return await agendaRepo.Excluir(id_appointment);
}

export default { InsertAgenda, ListarServicos, Editar, Excluir };