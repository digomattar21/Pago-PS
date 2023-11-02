import { User } from '@prisma/client';
import { IUserRepository } from '../repository/userRepository/IUserRepository';
import { ResponseApiOnSucessOrErrorType } from '../types/response_type';
import { ErrosTypes } from '../config/utils/errorTypes';
import { validateUser } from '../yup/userValidation';
import { inject, injectable } from 'tsyringe';
import ResponseOnSucessOrError from '../config/utils/response';

@injectable()
export class UserUseCase {
  private response = new ResponseOnSucessOrError();
  private validate = validateUser;
  
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async createNewUser(user:User): Promise<ResponseApiOnSucessOrErrorType<User,ErrosTypes>> {
    try {
      await this.validate.create(user);
      const newUser = await this.userRepository.createUser(user);
      return this.response.created<User,null>(newUser, null);
    } catch (error) {
      return this.response.error<ErrosTypes>(error);
    }
  }
  public async getUserById(id:number): Promise<ResponseApiOnSucessOrErrorType<User,ErrosTypes >> {
    try {
      const userFound = await this.userRepository.getUser(id);
      if (!userFound) {
        return this.response.notFound<null,string>('Usuário não encontrado');
      }
      return this.response.created<User,null>(userFound, null);
    } catch (error) {
      return this.response.error<ErrosTypes>(error);
    }
  }

  public async updateUser(user:User): Promise<ResponseApiOnSucessOrErrorType<User,ErrosTypes>>{
    try {
      await this.validate.update(user);
      const { id } = user;
      const updateUser = await this.userRepository.updateUser(id,user);
      if (updateUser === null) {
        return this.response.notFound<null,string>('Usuário não encontrado');
      }
      return this.response.success<User,null>(updateUser, null);
    } catch (error) {
      return this.response.error<ErrosTypes>(error);
    }
  }
  public async deleteUserById(id:number): Promise<ResponseApiOnSucessOrErrorType<string,ErrosTypes>>{
    try {
      const deleteUser = await this.userRepository.deleteUser(id);

      if(deleteUser === null) {
        return this.response.notFound<null,string>('Usuário não encontrado');
      }
      return this.response.success<string,null>('Usuário excluído com sucesso', null);
    } catch (error) {
      return this.response.error<ErrosTypes>(error);
    }
  }
}