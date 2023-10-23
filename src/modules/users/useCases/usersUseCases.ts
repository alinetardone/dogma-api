import { User } from "@prisma/client";
import * as cache from "../../../http/cache/cacheRepositories";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { GetUserDTO } from "../dtos/getUserDTO";
import { AppError } from "../../../errors/AppError";
import { createUser, deleteUser, findAllUsers, findUserByEmail, findUserById, updateUser } from "../repositories/user.repository"
import { UpdateUserDTO } from "../dtos/updateUserDTO";
import { DeleteUserDTO } from "../dtos/deleteUserDTO";
import { logger } from "../../../utils/logger";
import { LoginUserDTO } from "../dtos/loginUserDTO";

export class UsersUseCase {

    async login({ email, password }: LoginUserDTO): Promise<User> {

        const user = await findUserByEmail(email as string)

        if (!user) {

            throw new AppError("Esse usuário não existe.")
        }

        if (user.password !== password) {

            throw new AppError("As senhas não coincidem")

        }

        const cacheKey = `user-${user.id}`;
        await cache.setRedis(cacheKey, user.id);

        return user
    }

    async create({ name, email, password }: CreateUserDTO): Promise<User> {

        const userAlreadyExists = await findUserByEmail(email as string)

        if (userAlreadyExists) {

            throw new AppError("User already exists")
        }

        const userCreated = await createUser(name as string, email as string, password as string)

        return userCreated
    }

    async update({ id, data }: UpdateUserDTO): Promise<User> {

        const userFound = await findUserById(id as string)

        if (!userFound) {

            throw new AppError("User not found")
        }

        const userUpdated = await updateUser(id as string, data as JSON)

        return userUpdated
    }

    async delete({ id }: DeleteUserDTO): Promise<User> {

        const userFound = await findUserById(id as string)

        if (!userFound) {

            throw new AppError("User not found")
        }

        const userDeleted = await deleteUser(id as string)

        return userDeleted
    }

    async getUserById({ id }: GetUserDTO): Promise<User> {

        const userFound = await findUserById(id as string)

        if (!userFound) {

            throw new AppError("User not found")
        }

        return userFound
    }

    async getAllUsers(): Promise<User[]> {

        const usersFinded = await findAllUsers()

        if (!usersFinded) {

            throw new AppError("Users not found")
        }

        return usersFinded
    }
}