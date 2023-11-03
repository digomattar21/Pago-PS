import { Post } from '@prisma/client';
import * as yup from 'yup';
import { IPostRepository } from '../repository/postRepository/IPostRepository';
import { ErrosTypes } from '../config/utils/errorTypes';
import { validatePost } from '../yup/postValidation';
import { inject, injectable } from 'tsyringe';
import ResponseOnSucessOrError from '../config/utils/response';
import { ResponseApiOnSucessOrErrorType } from '../types/response_type';

@injectable()
export class PostUseCase {
  private response = new ResponseOnSucessOrError();
  private validate = validatePost;
  
  constructor(
    @inject('PostRepository') 
    private postRepository: IPostRepository
  ) {}

  public async createNewPost(post:Post): Promise<ResponseApiOnSucessOrErrorType<Post,ErrosTypes>> {
    try {
      await this.validate.create(post);
      const newPost = await this.postRepository.createPost(post);
      return this.response.created<Post,null>(newPost, null);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors:string[] = error.errors;
        
        return this.response.badRequest<null, string[]>(validationErrors);
      }
      return this.response.error<ErrosTypes>(error);
    }
  }
  public async getPostById(id:number): Promise<ResponseApiOnSucessOrErrorType<Post,ErrosTypes >> {
    try {
      const postFound = await this.postRepository.getPost(id);
      if (!postFound) {
        return this.response.notFound<null,string>('Post não encontrado');
      }
      return this.response.success<Post,null>(postFound, null);
    } catch (error) {
      return this.response.error<ErrosTypes>(error);
    }
  }

  public async updatePost(post:Post): Promise<ResponseApiOnSucessOrErrorType<Post,ErrosTypes>>{
    try {
      await this.validate.update(post);
      const { id } = post;
      const updatePost = await this.postRepository.updatePost(id,post);
      if (updatePost === null) {
        return this.response.notFound<null,string>('Post não encontrado');
      }
      return this.response.success<Post,null>(updatePost, null);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors:string[] = error.errors;
        return this.response.badRequest<null, string[]>(validationErrors);
      }
      return this.response.error<ErrosTypes>(error);
    }
  }
  public async deletePostById(id:number): Promise<ResponseApiOnSucessOrErrorType<string,ErrosTypes>>{
    try {
      const deletePost = await this.postRepository.deletePost(id);

      if(deletePost === null) {
        return this.response.notFound<null,string>('Post não encontrado');
      }
      return this.response.success<string,null>('Post excluído com sucesso', null);
    } catch (error) {
      return this.response.error<ErrosTypes>(error);
    }
  }
}