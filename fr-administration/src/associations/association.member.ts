import { Role } from "src/role/role.entity"


export class AssociationMember {
    id: number
    role: Role
    firstname: string
    lastname: string
    age: number

    constructor(id: number, role: Role, firstname: string, lastname: string, age: number) {
        this.id = id
        this.age = age
        this.firstname = firstname
        this.lastname = lastname
        this.role = role
    }
}