import { Controller, Body, Post, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import { User } from 'src/users/user.entity';

@Controller('associations')
export class AssociationsController {

    constructor(
        private service:AssociationsService
    ){}

    @Get()
    get(): Association[] {
        return this.service.getAssociations()
    }

    @Get(':id')
    getAssociationByID(@Param('id') id: number): Association {
        const as=this.service.getAssociationByID(id)
        if(as==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }
        return as
    }

    @Put(':id')
    UpdateAssociationByID(@Param('id') id: number, @Body() input: any) :Association {
        const as = this.service.UpdateAssociationByID(id,input.idUsers,input.name)
        if(as==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }

        return as
    }

    @Delete(':id')
    DeleteAssociationByID(@Param('id')id: number):Boolean{

        if(this.service.getAssociationByID(id)==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }
        return this.service.DeleteAssociationByID(id)
    }

    @Post()
    create(@Body() input: any): Association {
       return this.service.create(input.idUsers,input.name)
    }

    @Get(':id/members')
    getMembers(@Param() parameter): User[] {
        return this.service.getMembers(parameter.id)
    }

}
