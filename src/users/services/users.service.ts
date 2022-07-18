import { CRUD } from "../../common/crud.interface"
import {CreateUserDto} from "../dto/create.user.dto";
import UsersDao from "../daos/users.dao";
import {PutUserDto} from "../dto/put.user.dto";

class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.create(resource)
  }

  async list(limit: number, page: number) {
    return UsersDao.getUsers();
  }

  async putById(id: string, resource: PutUserDto) {
    return UsersDao.putUserById(id, resource)
  }

  async readById(id: string) {
    return UsersDao.getUser(id)
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email)
  }

  async deleteById(id: string) {
    return UsersDao.removeUserById(id)
  }
}

export default new UsersService()