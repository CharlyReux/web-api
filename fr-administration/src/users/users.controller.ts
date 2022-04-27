import { Controller, Body, Post, Get, Param, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { create } from 'domain';
import { Role } from 'src/role/role.entity';

import { User } from './user.entity';
import { UserInput } from './UserInput';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private service:UsersService
    ){}

    @Get('all')
    getAll(): string[] {
        return ['a', 'b', 'c'];
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async get(): Promise<User[]> {
        return this.service.getUsers()
    }

    @Get(':id')
    public async getUserByID(@Param('id') id: number): Promise<User> {
        const us=this.service.getUserByID(id)
        if(us==undefined){
            throw new HttpException('Could not find a user with th id '+id,HttpStatus.NOT_FOUND)
        }
        return us
    }

    @Put(':id')
    public async UpdateUserByID(@Param('id') id: number, @Body() input: UserInput) :Promise<User> {
        const us = this.service.UpdateUserByID(id,input.lastname,input.firstname,input.age)
        if(us==undefined){
            throw new HttpException('Could not find a user with th id '+id,HttpStatus.NOT_FOUND)
        }

        return us
    }

    @Delete(':id')
    public async DeleteUserByID(@Param('id')id: number):Promise<Boolean>{

        if(this.service.getUserByID(id)==undefined){
            throw new HttpException('Could not find a user with th id '+id,HttpStatus.NOT_FOUND)
        }
        return this.service.DeleteUserByID(id)
    }



    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    public async create(@Body() input: UserInput): Promise<User> {
       return this.service.create(input.lastname,input.firstname,input.age,input.password)
    }

    @Get(":id/roles")
    public async getRoleByUserID(@Param('id')id:number):Promise<Role[]>{
        return this.service.getRoleByUserID(id)
    }

}


