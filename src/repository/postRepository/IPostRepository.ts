import { Post } from '@prisma/client';

export interface IPostRepository {
    getPost(id: number): Promise<Post | null>;
    createPost(post: Post): Promise<Post>;
    updatePost(id: number, post: Post): Promise<Post | null>;
    deletePost(id: number): Promise<void | null>;
}