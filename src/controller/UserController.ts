import { Request, Response } from 'express';
import { UserUseCase } from '../useCases/UserUseCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserController {
  constructor(
    @inject('UserUseCase') private userUseCase : UserUseCase
  ) {}

  async create(request:Request, response:Response) {
    const { codeHttp, ...rest } = await this.userUseCase.createNewUser(request.body);
    return response.status(codeHttp).json(rest);
  }

  async update(request:Request, response:Response) {
    const id = Number(request.params.id); 
    const { codeHttp, ...rest } = await this.userUseCase.updateUser({id,...request.body});
    return response.status(codeHttp).json(rest);
  }

  async delete(request:Request, response:Response) {
    const id = Number(request.params.id);
    const { codeHttp, ...rest } = await this.userUseCase.deleteUserById(id);
    return response.status(codeHttp).json(rest);
  }

  async read(request:Request, response:Response) {
    const id = Number(request.params.id);
    const { codeHttp, ...rest } = await this.userUseCase.getUserById(id);
    return response.status(codeHttp).json(rest);
  }
}