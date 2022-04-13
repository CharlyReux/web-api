import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import {Association} from './association.entity'

const associations:Association[] = [
    {
        id:0,
        idUsers:[0],
        name:"FirstAssoc"
    }
]

@Injectable()
export class AssociationsService {
    currentId: number = 0

    create(idUsers: number[], name: string) {
        const as:Association = new Association(++this.currentId, idUsers, name)
        associations.push(as)
        return as

    }

    getAssociations() {
        return associations
    }

    getAssociationByID(id:number):Association{
        return associations.find(x => x.id === +id)
    }

    UpdateAssociationByID(id:number,idUsers:number[], name:string):Association{
        const as = associations.find(x => x.id === +id)
        if(idUsers !== undefined) {
            as.idUsers = idUsers
        }
        if(name !== undefined) {
            as.name = name
        }
        return as
    }

    DeleteAssociationByID(id:number):boolean{
        const before: number = associations.length

        associations.splice(+id,1)

        return before!==associations.length;
    }

    getMembers(id:number):User[]{
        const as:Association  = associations.find(x=>x.id===id)
        const listUs:User[]= null;
        return null
    }
}
