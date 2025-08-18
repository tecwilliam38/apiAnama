import userService from "../Services/userService";



async function CadastroUser(req, res) {

    const { user_email, user_password, user_name, user_cel_phone, endereco } = req.body;

    const user = await userService.CadastroUser(user_email, user_password, user_name, user_cel_phone, endereco);

    res.status(201).json(user);
}
async function LoginUser(req, res) {

    const { user_email, user_password } = req.body;

    const userData = await userService.LoginUser(user_email, user_password);

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
    const { user_email, user_password, user_name, user_cel_phone, endereco, } = req.body;

    const user = await userService.EditarUser(id_user, user_email, user_password, user_name, user_cel_phone, endereco);

    res.status(200).json(user);
}


export default { CadastroUser, LoginUser, ProfileUser };

