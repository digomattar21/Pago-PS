import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository {

  constructor(
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  async getUser(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({where: { id }});
  }

  async createUser(user: User): Promise<User> {
    return await this.prisma.user.create({data: {...user }});
  }

  async updateUser(id: number, user: User): Promise<User | null> {
    if (!await this.getUser(id)) {
      return null;
    }
    return await this.prisma.user.update({where: { id }, data: { ...user}});
  }

  async deleteUser(id: number): Promise<void | null> {
    if (!await this.getUser(id)) {
      return null;
    }
    await this.prisma.user.delete({where: { id }});
  }
}