import { Post, PrismaClient } from '@prisma/client';
import { IPostRepository } from './IPostRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PostRepository implements IPostRepository {

  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient
  ) {}

  async getPost(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({where: { id }});
  }

  async createPost(post:Post): Promise<Post> {
    return await this.prisma.post.create({data: {...post}});
  }

  async updatePost(id: number, post: Post): Promise<Post | null> {
    if (!await this.getPost(id)) {
      return null;
    }
    return await this.prisma.post.update({where: { id },data: {...post}});
  }

  async deletePost(id: number): Promise<void | null> {
    if (!await this.getPost(id)) {
      return null;
    }
    await this.prisma.post.delete({ where: {id}});
  }
}