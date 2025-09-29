import agendaService from "../Services/agendaService.js";

async function InsertAgenda(req, res) {

    const id_user = req.user.id_user; // vem do token decodificado
    const { id_service, id_client, price, status, booking_datetime } = req.body;

    try {
        const id_appointment = await agendaService.InsertAgenda(id_user, id_service, id_client, price, status, booking_datetime);
        res.status(201).json({ id_appointment });
    } catch (error) {
        console.error('Erro ao inserir agendamento:', error);
        res.status(500).json({ error: 'Erro ao inserir agendamento' });
    }
}

async function ListarServicos(req, res) {

    const id_user = req.user.id_user;
    const { dt_start, dt_end } = req.body;
    // const { dt_start, dt_end } = req.query;

    // Converte para null se estiver vazio
    dt_start = dt_start || null;
    dt_end = dt_end || null;



    try {
        const servicos = await agendaService.ListarServicos(id_user, dt_start, dt_end);
        res.status(200).json(servicos);
    } catch (error) {
        console.error('Erro ao listar serviços:', error);
        res.status(500).json({ error: 'Erro ao listar serviços' });
    }
}

async function Editar(req, res) {

    const id_appointment = req.params.id_appointment;
    const { id_user, id_service, id_client, price, status, booking_datetime } = req.body;

    try {
        const updated = await agendaService.Editar(id_appointment, id_user, id_service, id_client, price, status, booking_datetime);
        res.status(200).json(updated);
    } catch (error) {
        console.error('Erro ao editar agendamento:', error);
        res.status(500).json({ error: 'Erro ao editar agendamento' });
    }
}
async function Excluir(req, res) {

    const id_appointment = req.params.id_appointment;

    try {
        await agendaService.Excluir(id_appointment);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
        res.status(500).json({ error: 'Erro ao excluir agendamento' });
    }
}
export default { InsertAgenda, ListarServicos, Editar, Excluir };