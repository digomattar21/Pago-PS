import 'reflect-metadata';
import { InMemoryPostRepository } from '../repository/postRepository/InMemoryPostRepository';
import { Post } from '@prisma/client';
import ResponseOnSucessOrError from '../config/utils/response';
import { PostUseCase } from '../useCases/PostUseCase';

const post:Post = {
  id: 1,
  title: 'Test Post',
  content: 'This is a test post',
  authorId: 1,
  published: false,
  created_at: new Date(),
  updated_at: null,
};

const incorrectPost = {
  id: 1,
  title: 1111,
  content: 'This is a test post',
  created_at: new Date(),
  updated_at: null,
};
const responseOn = new ResponseOnSucessOrError;

describe('PostUseCase', () => {

  const postRepository = new InMemoryPostRepository();
  const postUseCase = new PostUseCase(postRepository);
  
  describe('createPost', () => {
    it('should create a new post', async () => {
      
      const createdPost = await postUseCase.createNewPost(post);

      expect(createdPost).toEqual(responseOn.created<Post,null>(post, null));
    });
    it('should return an error if the payload is incorrect during creation', async () => {
      
      const createdPost = await postUseCase.createNewPost(incorrectPost as unknown as Post);

      expect(createdPost).toEqual(responseOn.badRequest<null, string[]>(createdPost.error as unknown as string[]));
    });
  });

  describe('getPostById', () => {
    it('should return a post by id', async () => {
      
      await postRepository.createPost(post);

      const foundPost = await postUseCase.getPostById(1);

      expect(foundPost).toEqual(responseOn.success<Post,null>(foundPost.data, null));
    });

    it('should return an error if it cannot locate the post.', async () => {
      
      await postRepository.createPost(post);
  
      const foundPost = await postUseCase.getPostById(2);
  
      expect(foundPost).toEqual(responseOn.notFound<null,string>(foundPost.error as unknown as string));
    });
  });

  describe('updatePost', () => {
    it('should return the updated post', async () => {
      const createdPost = await postRepository.createPost(post);

      const updatedPost: Post = {
        id: createdPost.id,
        title: 'Test updated Post',
        content: 'This is a test post',
        authorId: createdPost.authorId,
        published: createdPost.published,
        created_at: createdPost.created_at,
        updated_at: new Date(),
      };

      const result = await postUseCase.updatePost(updatedPost);

      expect(result).toEqual(responseOn.success<Post,null>(result.data, null));
    });

    it('should return an error if the payload is incorrect during updated', async () => {
      
      const updatePost = await postUseCase.updatePost(incorrectPost as unknown as Post);
    
      expect(updatePost).toEqual(responseOn.badRequest<null, string[]>(updatePost.error as unknown as string[]));
    });

    it('should return an error when attempting to update as it cannot locate the post', async () => {
  
      await postRepository.createPost(post);
    
      const notFoundPost = await postUseCase.deletePostById(2);
    
      expect(notFoundPost).toEqual(responseOn.notFound<null,string>(notFoundPost.error as unknown as string));
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
  
      await postRepository.createPost(post);
  
      const deletePost = await postUseCase.deletePostById(1);
  
      expect(deletePost).toEqual(responseOn.success<string,null>(deletePost.data, null));
    });
  
    it('should return an error when attempting to delete as it cannot locate the post', async () => {
  
      await postRepository.createPost(post);

      const deletePost = await postUseCase.deletePostById(2);
  
      expect(deletePost).toEqual(responseOn.notFound<null,string>(deletePost.error as unknown as string));
    });
  });
});


