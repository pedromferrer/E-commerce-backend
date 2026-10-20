import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';
import { promises } from 'dns';

@Injectable()
export class UserService {

    private users: User[] = [];
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const salt0rRounds = 10;

        const passwordHashed = await hash(createUserDto.password, salt0rRounds)

        const user: User  = {
            ...createUserDto,
            id: this.users.length + 1,
            password: passwordHashed
        }
        this.users.push(user)

        return user;
    }

    async getAllUser(): Promise<User[]>{
        return this.users;
    }
}
