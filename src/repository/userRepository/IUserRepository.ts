import { User } from '@prisma/client';

export interface IUserRepository {
    getUser(id: number): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: User): Promise<User | null>;
    deleteUser(id: number): Promise<void | null>;
}