import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { AssociationForm } from './association-form.entity';

@Injectable()
export class AssociationFormService {
    constructor(
        @InjectRepository(AssociationForm)
        private repository : Repository<AssociationForm>
    ){}

    public async create(financialValidation:boolean,legalValidation:boolean):Promise<AssociationForm>{
        const asFo:AssociationForm = this.repository.create({
            legalValidation:legalValidation,
            financialValidation:financialValidation
        })
        this.repository.save(asFo)
        return asFo
    }

    public async get():Promise<AssociationForm[]>{
        return this.repository.find()
    }

    public async getAssociationFormByID(id:number):Promise<AssociationForm>{
        return this.repository.findOne({id:Equal(id)})
    }

    public async updateAssociationFormByID(id:number,financialValidation:boolean,legalValidation:boolean):Promise<AssociationForm>{
        const asFo:AssociationForm = await this.getAssociationFormByID(id)
        if(financialValidation!==undefined){
            asFo.financialValidation = financialValidation
        }
        if(legalValidation!== undefined){
            asFo.legalValidation= legalValidation
        }
        return asFo
    }

    public async deleteAssociationFormByID(id:number):Promise<boolean>{
        return (await this.repository.delete({id:Equal(id)})).affected!=0
    }

}
