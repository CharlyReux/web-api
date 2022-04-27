import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationDTO } from 'src/associations/association.dto';
import { Association } from 'src/associations/association.entity';
import { AssociationsService } from 'src/associations/associations.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Equal, Repository } from 'typeorm';
import { Minute } from './minute.entity';

@Injectable()
export class MinuteService {

    constructor(
        private userServ: UsersService,
        private assocServ: AssociationsService,
        @InjectRepository(Minute)
        private repository: Repository<Minute>
    ) { }

    public async getMinute(): Promise<Minute[]> {
        return this.repository.find({relations:["voters"]})
    }

    public async create(content: string, date: string, idAssociation: number, idVoters: number[]): Promise<Minute> {
        const tmpAssoc: Association = await this.assocServ.getAssociationByID(idAssociation)
        var tmpUsers: User[] = []
        for (let i = 0; i < idVoters.length; i++) {
            const element = await this.userServ.getUserByID(idVoters[i]);
            tmpUsers.push(element)
        }
        const tmpMinute: Minute = this.repository.create({
            voters: tmpUsers,
            content: content,
            date: date,
            association: tmpAssoc
        })
        this.repository.save(tmpMinute)
        return tmpMinute
    }

    public async getMinuteByIDAssoc(idAssoc: number): Promise<Minute[]> {
        return this.repository.find({
            where: {
                association: { id: idAssoc }
            },
            relations:["voters"]
        })
    }

    public async getMinuteByID(id: number): Promise<Minute> {
        return this.repository.findOne({idMinute:Equal(+id) },{relations:["voters"]})
    }

    public async UpdateMinuteByID(id: number, content: string, date: string, idAssociation: number, idVoters: number[]): Promise<Minute> {
        const tmpMinute: Minute = await this.getMinuteByID(id)

        if (content !== undefined) {
            tmpMinute.content = content
        }
        if (date !== undefined) {
            tmpMinute.date = date
        }
        if (idAssociation !== undefined) {
            tmpMinute.association =  await this.assocServ.getAssociationByID(idAssociation)
        }
        if (idVoters !== undefined) {
            var tmpUsers: User[] = []
            for (let i = 0; i < idVoters.length; i++) {
                const element = await this.userServ.getUserByID(idVoters[i]);
                tmpUsers.push(element)
            }
            tmpMinute.voters = tmpUsers
        }
        this.repository.save(tmpMinute)
        return tmpMinute
    }

    public async DeleteMinuteByID(id: number): Promise<Boolean> {
        return (await this.repository.delete({ idMinute: id })).affected != 0
    }

}
