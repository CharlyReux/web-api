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
        //TODO:Erreur lors de la création d'une deuxième association:
        //curl -X POST -d "firstname=Jane&lastname=Doe" http://localhost:3000/users/
        //curl -X POST -d "firstname=Jhon&lastname=Doe" http://localhost:3000/users/
        //curl -X POST -d "idUsers[]=1&name=Assoc1" http://localhost:3000/associations/
        //curl -X POST -d "idUsers[]=1&name=Assoc2" http://localhost:3000/associations/

        //Pas oublier de creer les deux bases de données:
        //sqlite mydatabase.db et "".db.old
    }

    public async getAssociations() {
        return this.repository.find()
    }

    public async getAssociationByID(id:number):Promise<Association>{
        return this.repository.findOne(+id)
    }

    public async UpdateAssociationByID(id:number,idUsers:number[], name:string):Promise<Association>{
        const as = await this.repository.findOne(+id)
        if(idUsers !== undefined) {
            var tmpUsers:User[] = []
            for (let i = 0; i < idUsers.length; i++) {
                const element = await this.service.getUserByID(idUsers[i]);
                tmpUsers.push(element)
            }
            as.users = tmpUsers
        }
        if(name !== undefined) {
            as.name = name
        }
        return as
    }

    public async DeleteAssociationByID(id:number):Promise<boolean>{
        return (await this.repository.delete(id)).affected!=0;
    }

    public async getMembers(id:number):Promise<User[]>{
        const as:Association  = await this.repository.findOne(+id)
        return as.users
    }
}
