import User from "./user.class.js";

let nextId = 1;

export default class Users {
  constructor() {
    this.data = [];
  }

  populate(data) {
    this.data = data.map(
      (item) => new User(item.id, item.nick, item.email, item.password)
    );

    const maxId = this.data.reduce(
      (max, item) => (item.id > max ? item.id : max),
      0
    );
    nextId = maxId + 1;
  }

  addUser(user) {
    const newUser = new User(nextId++, user.nick, user.email, user.password);
    this.data.push(newUser);
    return newUser;
  }

  removeUser(userId) {
    const index = this.getUserIndexById(userId);
    this.data.splice(index, 1);
  }

  changeUser(user) {
    const index = this.getUserIndexById(user.id);
    const modifiedUser = new User(
      user.id,
      user.nick,
      user.email,
      user.password
    );
    this.data.splice(index, 1, modifiedUser);
    return modifiedUser;
  }

  toString() {
    let text = `Users: ${this.data.length}`;
    this.data.forEach((item) => {
      text += `\n${item.toString()}`;
    });
    return text;
  }

  getUserById(userId) {
    const user = this.data.find((item) => item.id === userId);
    if (!user) {
      throw new Error(`No hay usuario con ese id`);
    }
    return user;
  }

  getUserIndexById(userId) {
    const index = this.data.findIndex((item) => item.id === userId);
    if (index === -1) {
      throw new Error(`No hay usuario con ese id`);
    }
    return index;
  }

  getUserByNickName(nick) {
    const user = this.data.find((item) => item.nick === nick);
    if (!user) {
      throw new Error(`No hay usuario con ese nick`);
    }
    return user;
  }
}
