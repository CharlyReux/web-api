import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Equal, Repository } from 'typeorm';
import { AssociationDTO } from './association.dto';
import { Association } from './association.entity'
import { AssociationMember } from './association.member';




@Injectable()
export class AssociationsService {
    currentId: number = 0

    constructor(
        @Inject(forwardRef(()=>UsersService))
        private service: UsersService,
        @InjectRepository(Association)
        private repository: Repository<Association>
    ) { }

    public async create(idUsers: number[], name: string): Promise<Association> {
        var tmpUsers: User[] = []
        for (let i = 0; i < idUsers.length; i++) {
            const element :User= await this.service.getUserByID(idUsers[i]);
            tmpUsers.push(element)
        }
        const as: Association = this.repository.create({
            id: ++this.currentId,
            name: name,
            users: tmpUsers
        })
        this.repository.save(as)
        return as
    }

    public async getAssociations(): Promise<Association[]> {
        const assocs: Association[] = await this.repository.find({ relations: ["users"] })
        return assocs
    }

    public async getAssociationByID(id: number): Promise<Association> {
        const as:Association =await this.repository.findOne({ id: Equal(+id) },{relations:["users"]})
        return as
    }

    public async UpdateAssociationByID(id: number, idUsers: number[], name: string): Promise<Association> {
        const as = await this.repository.findOne({ id: Equal(+id) },{relations:["users"]})
        if (idUsers !== undefined) {
            var tmpUsers: User[] = []
            for (let i = 0; i < idUsers.length; i++) {
                const element = await this.service.getUserByID(idUsers[i]);
                tmpUsers.push(element)
            }
            as.users = tmpUsers
        }
        if (name !== undefined) {
            as.name = name
        }
        this.repository.save(as)
        return as
    }

    public async DeleteAssociationByID(id: number): Promise<boolean> {
        return (await this.repository.delete({ id: Equal(+id) })).affected != 0;
    }

    public async getMembers(id: number): Promise<User[]> {
        const as: Association = await this.repository.findOne({ id: Equal(+id) },{relations:["users"]})
        return as.users
    }


}
