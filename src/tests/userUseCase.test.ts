import 'reflect-metadata';
import { InMemoryUserRepository } from '../repository/userRepository/InMemoryUserRepository';
import { User } from '@prisma/client';
import ResponseOnSucessOrError from '../config/utils/response';
import { UserUseCase } from '../useCases/UserUseCase';

const user:User = {
  id: 1,
  email: 'teste@emil.com',
  name: 'nome teste',
  created_at: new Date(),
  updated_at: null,
};

const incorrectUser = {
  id: 1,
  email: 13455,
  created_at: new Date(),
  updated_at: null,
};
const responseOn = new ResponseOnSucessOrError;

describe('UserUseCase', () => {

  const userRepository = new InMemoryUserRepository();
  const userUseCase = new UserUseCase(userRepository);
  
  describe('createUser', () => {
    it('should create a new user', async () => {
      
      const createdUser = await userUseCase.createNewUser(user);

      expect(createdUser).toEqual(responseOn.created<User,null>(user, null));
    });
    it('should return an error if the payload is incorrect during creation', async () => {
      
      const createdUser = await userUseCase.createNewUser(incorrectUser as unknown as User);

      expect(createdUser).toEqual(responseOn.badRequest<null, string[]>(createdUser.error as unknown as string[]));
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      
      await userRepository.createUser(user);

      const foundUser = await userUseCase.getUserById(1);

      expect(foundUser).toEqual(responseOn.success<User,null>(foundUser.data, null));
    });

    it('should return an error if it cannot locate the user.', async () => {
      
      await userRepository.createUser(user);
  
      const foundUser = await userUseCase.getUserById(2);
  
      expect(foundUser).toEqual(responseOn.notFound<null,string>(foundUser.error as unknown as string));
    });
  });

  describe('updateUser', () => {
    it('should return the updated user', async () => {
      const createdUser = await userRepository.createUser(user);

      const updatedUser: User = {
        id: createdUser.id,
        name: 'updated name',
        email: 'updated@email.com',
        created_at: createdUser.created_at,
        updated_at: new Date(),
      };

      const result = await userUseCase.updateUser(updatedUser);

      expect(result).toEqual(responseOn.success<User,null>(result.data, null));
    });

    it('should return an error if the payload is incorrect during updated', async () => {
      
      const updateUser = await userUseCase.updateUser(incorrectUser as unknown as User);
      console.log('updateUser',updateUser);
    
      expect(updateUser).toEqual(responseOn.badRequest<null, string[]>(updateUser.error as unknown as string[]));
    });

    it('should return an error when attempting to update as it cannot locate the user', async () => {
  
      await userRepository.createUser(user);
    
      const notFoundUser = await userUseCase.deleteUserById(2);
    
      expect(notFoundUser).toEqual(responseOn.notFound<null,string>(notFoundUser.error as unknown as string));
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
  
      await userRepository.createUser(user);
  
      const deleteUser = await userUseCase.deleteUserById(1);
  
      expect(deleteUser).toEqual(responseOn.success<string,null>(deleteUser.data, null));
    });
  
    it('should return an error when attempting to delete as it cannot locate the user', async () => {
  
      const usercreated = await userRepository.createUser(user);
      console.log('usercreated',usercreated);
      const deleteUser = await userUseCase.deleteUserById(2);
      console.log('deleteUser',deleteUser);
  
      expect(deleteUser).toEqual(responseOn.notFound<null,string>(deleteUser.error as unknown as string));
    });
  });
});


