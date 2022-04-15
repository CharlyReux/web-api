import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import {Association} from './association.entity'



@Injectable()
export class AssociationsService {
    currentId: number = 0

    constructor(    
        private service: UsersService,
        @InjectRepository(Association)
        private repository: Repository<Association>
        ){}

    public async create(idUsers: number[], name: string) {
        var tmpUsers:User[] = []
        for (let i = 0; i < idUsers.length; i++) {
            const element = await this.service.getUserByID(idUsers[i]);
            tmpUsers.push(element)
        }

        const as:Association = this.repository.create({
            id: ++this.currentId,
            name: name,
            users: tmpUsers
        })
        this.repository.save(as)
        return as

    }

    public async getAssociations() {
        return this.repository
    }

    public async getAssociationByID(id:number):Promise<Association>{
        return this.repository.findOne(+id)
    }

    public async UpdateAssociationByID(id:number,idUsers:number[], name:string):Association{
        const as = await this.repository.findOne(+id)
        if(idUsers !== undefined) {
            as.users = idUsers.map((x)=>this.service.getUserByID(x))
        }
        if(name !== undefined) {
            as.name = name
        }
        return as
    }

    public async DeleteAssociationByID(id:number):boolean{
        const before: number = associations.length

        associations.splice(+id,1)

        return before!==associations.length;
    }

    public async getMembers(id:number):User[]{
        const as:Association  = associations.find(x=>x.id===+id)
        return as.users
    }
}
