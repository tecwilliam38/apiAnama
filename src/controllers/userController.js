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
  const { friend_email } = req.body;
  const user_id = req.user.id_user; // vindo do middleware JWT

  try {
    const friendRes = await pool.query(
      'SELECT id_user FROM anama_user WHERE user_email = $1',
      [friend_email]
    );

    if (friendRes.rowCount === 0) {
      return res.status(404).json({ error: 'Amigo não encontrado' });
    }

    const friend_id = friendRes.rows[0].id_user;

    if (friend_id === user_id) {
      return res.status(400).json({ error: 'Você não pode se adicionar como amigo' });
    }

    await pool.query(
      'INSERT INTO anama_amigos (user_id, friend_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [user_id, friend_id]
    );

    res.json({ success: true, message: 'Amigo adicionado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar amigo' });
  }
};



export default { CadastroUser, LoginUser, ProfileUser, EditarUsuario, addFriend };

