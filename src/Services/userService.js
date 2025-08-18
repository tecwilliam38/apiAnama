
import repoUser from "../repositories/repoUser.js";

async function CadastroUser(user_email, user_password, user_name, user_cel_phone, endereco) {

    const hashPassword = await bcrypt.hash(user_password, 10);
    const admin = await repoUser.CadastroUser(user_email, hashPassword, user_name, user_cel_phone, endereco);

    admin.token = jwt.CreateToken(admin.id_user);

    return admin;
}
async function LoginUser(user_email, user_password) {

    const userData = await repoUser.LoginUser(user_email);

    if (!userData)
        return null;
    else {
        if (await bcrypt.compare(user_password, userData.user_password)) {
            delete userData.user_password;

            userData.token = jwt.CreateToken(userData.id_user);

            return userData;
        } else
            return [];
    }
}
async function ProfileUser(id_user) {

    const userProfile = await repoUser.ProfileUser(id_user);

    return userProfile;
}

async function EditarUser(id_user, user_name, user_email, endereco, user_password, user_cel_phone) {

    const usuario = await repoUser.EditarUser(id_user, user_name, user_email,
        endereco, user_password, user_cel_phone);

    return usuario;
}


export default { CadastroUser, LoginUser, ProfileUser, EditarUser }
