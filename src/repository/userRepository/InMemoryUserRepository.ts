import { User } from '@prisma/client';
import { IUserRepository } from './IUserRepository';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];
  
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(User => User.id === id);
  }
  
  async createUser(user: User): Promise<User> {
    this.users.push({...user});
    return this.users[0];
  }
  
  async updateUser(id: number, user: User): Promise<User> {
    this.createUser(user);
    return this.users.find(user => user.id === id);
  }
  
  async deleteUser(id: number): Promise<void> {
    this.users.find(User => User.id === id);
    this.users.pop();
  }
}