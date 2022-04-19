import { Controller, Body, Post, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import { User } from 'src/users/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { AssociationInput } from './AssociationInput';

@ApiTags('Associations')
@Controller('associations')
export class AssociationsController {

    constructor(
        private service:AssociationsService
    ){}

    @Get()
    public async get(): Promise<Association[]> {
        return this.service.getAssociations()
    }

    @Get(':id')
    public async getAssociationByID(@Param('id') id: number): Promise<Association> {
        const as=this.service.getAssociationByID(id)
        if(as==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }
        return as
    }

    @Put(':id')
    public async UpdateAssociationByID(@Param('id') id: number, @Body() input: any) :Promise<Association> {
        const as = this.service.UpdateAssociationByID(id,input.idUsers,input.name)
        if(as==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }

        return as
    }

    @Delete(':id')
    public async DeleteAssociationByID(@Param('id')id: number):Promise<Boolean>{

        if(this.service.getAssociationByID(id)==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }
        return this.service.DeleteAssociationByID(id)
    }

    @Post()
    public async create(@Body() input: AssociationInput): Promise<Association> {
       return this.service.create(input.idUsers,input.name)
    }

    @Get(':id/members')
    public async getMembers(@Param() parameter): Promise<User[]> {
        return this.service.getMembers(parameter.id)
    }

}
