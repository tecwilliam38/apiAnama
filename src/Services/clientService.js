import bcrypt from "bcryptjs"
import jwt from "../token.js"
import clientRepo from "../repositories/repoClient.js";

async function InserirClient(client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, endereco_uf, phone_contato, task, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const client = await clientRepo.InserirClient(client_name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, endereco_uf, phone_contato, task, email, hashPassword);

    client.token = jwt.CreateToken(client.id_client);

    return client;
}
async function ListarClientId(id_client) {

    const client = await clientRepo.ListarClientId(id_client);

    return client;
}
async function ListarClient() {

    const client = await clientRepo.ListarClient();

    return client;
}

export default { InserirClient, ListarClientId, ListarClient }