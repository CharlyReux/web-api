import { User } from "src/users/user.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Association{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    users:User[]
    @Column()
    name:string

    constructor(id:number, users:User[],name:string){
        this.id=id
        this.users=users
        this.name=name
    }
}