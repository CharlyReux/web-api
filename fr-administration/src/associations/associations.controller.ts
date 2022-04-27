import { Controller, Body, Post, Get, Param, Put, Delete, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';
import { User } from 'src/users/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { AssociationInput } from './AssociationInput';
import { AssociationDTO } from './association.dto';
import { AssociationMember } from './association.member';
import { RoleService } from 'src/role/role.service';

@ApiTags('Associations')
@Controller('associations')
export class AssociationsController {

    constructor(
        @Inject(forwardRef(()=>AssociationsService))
        private service:AssociationsService,
        private roleServ: RoleService
    ){}

    @Get()
    public async get(): Promise<AssociationDTO[]> {
        const assocs:Association[] = await this.service.getAssociations()
        var allAsDTO:AssociationDTO[] = []
        for (let i = 0; i < assocs.length; i++) {
            const as = assocs[i];
            const members: AssociationMember[] = await this.createMembers(as.users, as.id)
            const asDTO: AssociationDTO = new AssociationDTO(as.id, members, as.name)
            allAsDTO.push(asDTO)
        }
        return allAsDTO
    }

    @Get(':id')
    public async getAssociationByID(@Param('id') id: number): Promise<AssociationDTO> {
        const as:Association= await this.service.getAssociationByID(id)
        if(as==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }
        console.log(as)
        const members: AssociationMember[] = await this.createMembers(as.users, as.id)
        const asDTO: AssociationDTO = new AssociationDTO(as.id, members, as.name)
        return asDTO
    }

    @Put(':id')
    public async updateAssociationByID(@Param('id') id: number, @Body() input: any) :Promise<AssociationDTO> {
        const as:Association = await this.service.UpdateAssociationByID(id,input.idUsers,input.name)
        if(as==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }
        const members: AssociationMember[] = await this.createMembers(as.users, as.id)
        const asDTO: AssociationDTO = new AssociationDTO(as.id, members, as.name)
        return asDTO
    }

    @Delete(':id')
    public async DeleteAssociationByID(@Param('id')id: number):Promise<Boolean>{

        if(this.service.getAssociationByID(id)==undefined){
            throw new HttpException('Could not find an association with the id '+id,HttpStatus.NOT_FOUND)
        }
        return this.service.DeleteAssociationByID(id)
    }

    @Post()
    public async create(@Body() input: AssociationInput): Promise<AssociationDTO> {
        const as:Association = await this.service.create(input.idUsers,input.name)
        const members: AssociationMember[] = await this.createMembers(as.users, as.id)
        const asDTO: AssociationDTO = new AssociationDTO(as.id, members, as.name)
       return asDTO
    }

    @Get(':id/members')
    public async getMembers(@Param() parameter): Promise<User[]> {
        return this.service.getMembers(parameter.id)
    }

    private async createMembers(users: User[], id: number): Promise<AssociationMember[]> {
        var members: AssociationMember[] = []
        for (let index = 0; index < users.length; index++) {
            const us = users[index];
            const tmpMember: AssociationMember = new AssociationMember(us.id, await this.roleServ.getRoleByID(us.id, id), us.firstname, us.lastname, us.age)
            members.push(tmpMember)
        }
        return members
    }

}
