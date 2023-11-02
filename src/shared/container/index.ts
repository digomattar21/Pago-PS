import { container } from 'tsyringe';
import { IPostRepository } from '../../repository/postRepository/IPostRepository';
import { PostRepository } from '../../repository/postRepository/PostRepository';
import { IUserRepository } from '../../repository/userRepository/IUserRepository';
import { UserRepository } from '../../repository/userRepository/UserRepository';
import { PrismaClient } from '@prisma/client';
import { UserUseCase } from '../../useCases/UserUseCase';
import { PostUseCase } from '../../useCases/PostUseCase';

container.register<IPostRepository>('PostRepository',{ useClass:PostRepository } );
container.register<IUserRepository>('UserRepository', { useClass:UserRepository });
container.register('UserUseCase',{ useClass:UserUseCase });
container.register('PostUseCase',{ useClass:PostUseCase });
container.register('PrismaClient',{ useValue: new PrismaClient() });