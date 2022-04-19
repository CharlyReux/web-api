import { User } from "src/users/user.entity"
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Association{
    @PrimaryGeneratedColumn()
    id:number
    @ManyToMany(()=>User)
    @JoinTable()
    users:User[]
    @Column()
    name:string

    constructor(id:number, users:User[],name:string){
        this.id=id
        this.users=users
        this.name=name
    }
}