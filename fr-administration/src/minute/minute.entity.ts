import { Association } from "src/associations/association.entity"
import { User } from "src/users/user.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Minute{
    @PrimaryGeneratedColumn()
    idMinute:number
    @Column()
    content:string
    @Column()
    date:string
    @ManyToMany(()=>User)
    @JoinTable()
    Voters:User[]
    @ManyToOne(type=>Association)
    association:Association

}