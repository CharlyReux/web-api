import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssociationForm } from './association-form.entity';
import { AssociationFormService } from './association-form.service';
import { AssociationFormInput } from './AssociationFormInput';
import { AssociationFormUpdate } from './AssociationFormUpdate';

@ApiTags('AssociationForm')
@Controller('association-form')
export class AssociationFormController {

    constructor(
        private service: AssociationFormService
    ) { }

    @Post()
    public async create(@Body() input:AssociationFormInput):Promise<AssociationForm>{
        return this.service.create(input.financialValidation,input.legalValidation)
    }

    @Get()
    public async get(): Promise<AssociationForm[]> {
        return this.service.get()
    }

    @Get(':id')
    public async getAssociationFormByID(@Param('id')id: number): Promise<AssociationForm> {
        const asFo: AssociationForm = await this.service.getAssociationFormByID(id)
        if (asFo == undefined) {
            throw new HttpException('Could not find an association with the id ' + id, HttpStatus.NOT_FOUND)
        }
        return asFo
    }

    @Put(':id')
    public async updateAssociationFormByID(@Param('id')id:number,@Body() input : AssociationFormUpdate):Promise<AssociationForm>{
        const asFo:AssociationForm = await this.service.updateAssociationFormByID(id,input.financialValidation,input.legalValidation)
        if(asFo==undefined){
            throw new HttpException('Could not find an associationForm with the id '+id,HttpStatus.NOT_FOUND)
        }
        return asFo
    }

    @Delete(':id')
    public async deleteAssociationFormByID(@Param('id') id:number):Promise<boolean>{
        return this.service.deleteAssociationFormByID(id)
    }

}
