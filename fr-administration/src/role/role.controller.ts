import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoleInput } from './RoleInput';
import { RoleUpdate } from './RoleUpdate';

@ApiTags('Role')
@Controller('role')
export class RoleController {

    constructor(
        private service: RoleService
    ) { }

    @Get()
    public async get(): Promise<Role[]> {
        return this.service.getRole()
    }

    @Post()
    public async create(@Body() input: RoleInput): Promise<Role> {
        return this.service.create(input.name, input.idUser, input.idAssociation);
    }
    @Get(':idUser/:idAssoc')
    public async getRoleByID(@Param('idUser') idUser: number, @Param('idAssoc') idAssoc: number): Promise<Role> {
        const rol = this.service.getRoleByID(idUser, idAssoc)
        return rol;
    }

    @Put(':idUser/:idAssoc')
    public async UpdateRoleByID(@Param('idUser') idUser: number, @Param('idAssoc') idAssoc: number, @Body() input: RoleUpdate): Promise<Role> {
        const tmpRole: Role = await this.service.UpdateRoleByID(idUser, idAssoc, input.name)
        if (tmpRole == undefined) {
            throw new HttpException('Could not find an association with the ids specified', HttpStatus.NOT_FOUND)
        }
        return tmpRole
    }

    @Delete(':idUser/:idAssoc')
    public async DeleteRoleByID(@Param('idUser') idUser: number, @Param('idAssoc') idAssoc: number): Promise<Boolean> {
        if(this.service.getRoleByID(idUser,idAssoc)==undefined){
            throw new HttpException('Could not find an Role with the specified ids ',HttpStatus.NOT_FOUND)
        }
        return this.service.DeleteRoleByID(idUser,idAssoc)
    }


}
