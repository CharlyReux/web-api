import { Controller, Body, Post, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { create } from 'domain';

import { User } from './user.entity';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {

    constructor(
        private service:UsersService
    ){}


    @Get('all')
    getAll(): string[] {
        return ['a', 'b', 'c'];
    }

    @Get()
    get(): User[] {
        return this.service.getUsers()
    }

    @Get(':id')
    getUserByID(@Param('id') id: number): User {
        const us=this.service.getUserByID(id)
        if(us==undefined){
            throw new HttpException('Could not find a user with th id '+id,HttpStatus.NOT_FOUND)
        }
        return us
    }

    @Put(':id')
    UpdateUserByID(@Param('id') id: number, @Body() input: any) :User {
        const us = this.service.UpdateUserByID(id,input.lastname,input.firstname,input.age)
        if(us==undefined){
            throw new HttpException('Could not find a user with th id '+id,HttpStatus.NOT_FOUND)
        }

        return us
    }

    @Delete(':id')
    DeleteUserByID(@Param('id')id: number):Boolean{

        if(this.service.getUserByID(id)==undefined){
            throw new HttpException('Could not find a user with th id '+id,HttpStatus.NOT_FOUND)
        }
        return this.service.DeleteUserByID(id)
    }



    @Post()
    create(@Body() input: any): User {
       return this.service.create(input.lastname,input.firstname,input.age)
    }

}


