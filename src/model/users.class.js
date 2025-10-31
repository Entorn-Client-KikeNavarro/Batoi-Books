import User from "./user.class.js";
import { getDBUsers, getDBUser, addDBUser, changeDBUserPassword } from '../services/api.js'
export default class Users{
    constructor(){
        this.data = [];
    }

    async populate(){
        const usuarios = await getDBUsers();
        usuarios.forEach(usuario => {
            let usuarioAIntroducir = new User(usuario.id, usuario.nick, usuario.email, usuario.password);
            this.data.push(usuarioAIntroducir);
        });
    }

    async getUser(id){
        const returnedUser = await getDBUser(id);
        return returnedUser;
    }

    async addUser(user){
        const addUser = await addDBUser(user);
        return addUser;
    }

    async removeUser(id){
        const removedUser = await removeDBUser(id);
        return removedUser;
    }

    async changeUser(user){
        const changedUser = await changeDBUser(user)
        return changedUser;
    }

    async changeUserPassword(id, newPassword){
        const userPasswordChanged = await changeDBUserPassword(id, newPassword);
        return userPasswordChanged;
    }

    toString(){
        
    }
}