
import repoUser from "../repositories/repoUser.js";
import bcrypt from "bcryptjs";
import jwt from "../token.js";

async function CadastroUser(user_email, user_name, user_cel_phone, endereco, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repoUser.CadastroUser(user_email, user_name, user_cel_phone, endereco, hashPassword);

    user.token = jwt.CreateToken(user.id_user);

    return user;
}

async function LoginUser(user_email, password) {

    const user = await repoUser.LoginUser(user_email);

       if (user.lenght == 0)
           return [];
       else {
          if (await bcrypt.compare(password, user.password)) {
               delete user.password;
               user.token = jwt.CreateToken(user.id_user);
               return user;
           } else
               return [];
       }
       return user;
}
async function ProfileUser(id_user) {

    const userProfile = await repoUser.ProfileUser(id_user);

    return userProfile;
}

async function EditarUser(id_user, user_name, user_email, endereco, password, user_cel_phone) {

    const usuario = await repoUser.EditarUser(id_user, user_name, user_email,
        endereco, password, user_cel_phone);

    return usuario;
}


const addFriend = async (id_user, friend_id) => {
  return await repoUser.insertFriendship(id_user, friend_id);
};



const fetchFriends = async (userId) => {
  return await repoUser.getFriendsByUserId(userId);
};
const findUserByContact = async (contact) => {
  return await repoUser.findByEmailOrPhone(contact);
};

const addFriendByContact = async (id_user, friend_id) => {
  return await repoUser.insertFriendshipByemail(id_user, friend_id);
};


export default { 
    CadastroUser, 
    LoginUser, 
    ProfileUser, 
    EditarUser, 
    fetchFriends, 
    addFriend,
    findUserByContact,
     addFriendByContact }
