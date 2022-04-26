import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Association } from 'src/associations/association.entity';
import { AssociationsService } from 'src/associations/associations.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        private userServ: UsersService,
        private assocServ: AssociationsService,
        @InjectRepository(Role)
        private repository: Repository<Role>
    ) { }

    public async getRole(): Promise<Role[]> {
        return this.repository.find()
    }

    public async create(name: string, idUser: number, idAssoc: number): Promise<Role> {
        const tmpUser: User = await this.userServ.getUserByID(idUser)
        const tmpAssoc: Association = await this.assocServ.getAssociationByID(idAssoc)
        const tmpRole: Role = this.repository.create({
            name: name,
            user: tmpUser,
            association: tmpAssoc
        })
        this.repository.save(tmpRole)
        return tmpRole
    }

    public async getRoleByID(idUser: number, idAssoc: number): Promise<Role> {
        const tmpRole: Role = await this.repository.findOne({
            where: {
                user: { id: idUser },
                association: { id: idAssoc }
            }
        })
        return tmpRole
    }

    public async UpdateRoleByID(idUser: number, idAssoc: number, name: string): Promise<Role> {
        const tmpRole: Role = await this.getRoleByID(idUser, idAssoc)
        tmpRole.name = name
        this.repository.save(tmpRole)
        return tmpRole
    }
    public async DeleteRoleByID(idUser: number, idAssoc: number): Promise<Boolean> {
        return (await this.repository.delete(await this.getRoleByID(idUser,idAssoc)
        )).affected != 0;

    }

}