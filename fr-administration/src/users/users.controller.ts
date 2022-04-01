import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { create } from 'domain';

import { User } from './user.entity';

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John'
    }
]

@Controller('users')
export class UsersController {
    currentId : number = 0


    @Get('all')
    getAll(): string[] {
        return ['a', 'b', 'c'];
    }

    @Get()
    get():User[]{
        return users
    }

    @Get(':id')
    getUserByID(@Param('id') id:number):User{
        return users.find(x => x.id ===+id)
    }



    @Post()
    create(@Body() input: any): User {
        const us : User = new User(++this.currentId,input.lastname,input.firstname)
        users.push(us)
        return  us
    }

}


