import bcrypt from "bcryptjs"
import jwt from "../token.js"
import clientRepo from "../repositories/repoClient.js";

async function InserirClient(client_name, client_sector, 
    endereco, phone_contato) {
    
    const client = await clientRepo.InserirClient(client_name, client_sector,
         endereco, phone_contato);

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