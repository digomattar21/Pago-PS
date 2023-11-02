import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PostUseCase } from '../useCases/PostUseCase';

export class PostController {
  private postUseCase = container.resolve(PostUseCase);

  async create(request:Request, response:Response) {
    const { codeHttp, ...rest } = await this.postUseCase.createNewPost(request.body);
    return response.status(codeHttp).json(rest);
  }

  async update(request:Request, response:Response) {
    const id = Number(request.params.id);
    const { codeHttp, ...rest } = await this.postUseCase.updatePost({id,...request.body});
    return response.status(codeHttp).json(rest);
  }

  async delete(request:Request, response:Response) {
    const id = Number(request.params.id);
    const { codeHttp, ...rest } = await this.postUseCase.deletePostById(id);
    return response.status(codeHttp).json(rest);
  }

  async read(request:Request, response:Response) {
    const id = Number(request.params.id);
    const { codeHttp, ...rest } = await this.postUseCase.getPostById(id);
    return response.status(codeHttp).json(rest);
  }
}