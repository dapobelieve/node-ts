import shortid from "shortid";
import debug from "debug"
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  users: Array<CreateUserDto> = [];

  constructor() {
    log("Created new instance of UsersDao")
  }

  async create(user: CreateUserDto) {
    user.id = shortid.generate()
    this.users.push(user);
    return user.id
  }

  async getUser(userId: string) {
    return this.users.find((user: {id: string }) => user.id === userId)
  }

  async getUsers() {
    return this.users;
  }

  async putUserById(userId: string, user: PutUserDto) {
    const index = this.users.findIndex(
      (obj: {id: string}) => obj.id === userId
    );

    this.users.splice(index, 1, user);
    return `${user.id} updated via put`
  }

  async patchUserById(userId: string, user: PatchUserDto) {
    const index = this.users.findIndex(
      (obj: {id: string}) => obj.id === userId
    );

    let currentUser = this.users[index];
    const allowedPatchFields = ['password', 'firstName', 'lastName', 'permissionLevel'];
    for (let field of allowedPatchFields) {
      if(field in user) {
        // @ts-ignore
        currentUser[field] = user[field]
      }
    }
    this.users.splice(index, 1, currentUser);
    return `${user.id} patched`
  }

  async getUserByEmail(email: string) {
    const index = this.users.findIndex(
      (obj: {email: string}) => obj.email === email
    )

    let currentUser = this.users[index];
    if(currentUser) {
      return currentUser
    }else {
      return null
    }
  }

  async removeUserById(userId: string) {
    const index = this.users.findIndex((obj: {id: string }) => obj.id === userId);
    this.users.splice(index, 1);
    return `${userId} removed`
  }
}

export default new UsersDao();