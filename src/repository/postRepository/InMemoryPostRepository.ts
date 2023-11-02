import { Post } from '@prisma/client';
import { IPostRepository } from './IPostRepository';


export class InMemoryPostRepository implements IPostRepository {
  private posts: Post[] = [];

  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.find(post => post.id === id);
  }

  async createPost(post: Post): Promise<Post> {
    this.posts.push({...post});
    return this.posts[0];
  }

  async updatePost(id: number, post: Post): Promise<Post> {
    this.createPost(post);
    return this.posts.find(post => post.id === id);
  }

  async deletePost(id: number): Promise<void> {
    this.posts.find(post => post.id === id);
    this.posts.pop();
  }
}
