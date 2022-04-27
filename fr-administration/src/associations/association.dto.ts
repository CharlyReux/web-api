import { RoleService } from "src/role/role.service"
import { Association } from "./association.entity"
import { AssociationMember } from "./association.member"

export class AssociationDTO{
    id:number
    users:AssociationMember[]
    name:string

    constructor(id:number,users:AssociationMember[],name:string){
        this.id = id
        this.name=name
        this.users=users
    }
/*     constructor(assoc:Association){
        this.id=assoc.id
        this.name=assoc.name
        var members:AssociationMember[] = []
        for (let index = 0; index < assoc.users.length; index++) {
            const us = assoc.users[index];
            const tmpMember:AssociationMember = new AssociationMember(us.id,roleServ.getRoleByID(us.id,assoc.id),us.firstname,us.lastname,us.age)
            members.push()
        }
    } */


}