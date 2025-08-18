
import repoUser from "../repositories/repoUser.js";
import bcrypt from "bcryptjs";
import jwt from "../token.js";
async function CadastroUser(user_name, endereco, user_cel_phone, user_email, user_password) {

    const hashPassword = await bcrypt.hash(user_password, 10);
    const user = await repoUser.CadastroUser(user_name, endereco, user_cel_phone, user_email, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;
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
