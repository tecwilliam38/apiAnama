import userService from "../Services/userService.js";



async function CadastroUser(req, res) {

  const { user_email, user_name, user_cel_phone, endereco, password } = req.body;

  const user = await userService.CadastroUser(user_email, user_name, user_cel_phone, endereco, password);

  res.status(201).json(user);
}

async function LoginUser(req, res) {

  const { user_email, password } = req.body;

  const userData = await userService.LoginUser(user_email, password);

  if (!userData)
    res.status(401).json({ error: "E-mail ou senha inválida" });
  else
    res.status(200).json(userData);
}

async function ProfileUser(req, res) {

  const id_user = req.params.id_user;
  const userProfile = await userService.ProfileUser(id_user);

  res.status(200).json(userProfile);
}

async function EditarUsuario(req, res) {

  const id_user = req.params.id_user;
  const { user_email, password, user_name, user_cel_phone, endereco, } = req.body;

  const user = await userService.EditarUser(id_user, user_email, password, user_name, user_cel_phone, endereco);

  res.status(200).json(user);
}

const addFriend = async (req, res) => {
  const { id_user, friend_id } = req.body;
  try {
    await userService.addFriend(id_user, friend_id);
    res.status(201).json({ message: 'Amizade criada com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar amigo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getFriends = async (req, res) => {
  try {
    const id_user = req.user.id_user;

    const friends = await userService.fetchFriends(id_user);
    res.json(friends);
  } catch (error) {
    console.error('Erro ao buscar amigos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
const addFriendByContact = async (req, res) => {
  const { requester_id, contact_info } = req.body;

  try {
    const friend = await userService.findUserByContact(contact_info);
    if (!friend) return res.status(404).json({ error: 'Usuário não encontrado' });

    await userService.addFriendByContact(requester_id, friend.id_user);
    res.status(201).json({ message: 'Amigo adicionado com sucesso' });
  } catch (err) {
    console.error('Erro ao adicionar amigo:', err);
    if (!friend || !friend.id_user) {
      return res.status(404).json({ error: 'Usuário não encontrado ou inválido' });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

function ListMyFriendsHandler(req, res) {
  const { userId } = req.params;

  userService.ListMyFriends(userId)
    .then(friends => res.status(200).json(friends))
    .catch(error => {
      console.error('Erro ao listar amigos:', error);
      res.status(500).json({ error: 'Erro interno ao buscar amigos.' });
    });
}


export default {
  CadastroUser,
  LoginUser,
  ProfileUser,
  EditarUsuario,
  addFriend,
  getFriends,
  addFriendByContact,
  ListMyFriendsHandler
};

