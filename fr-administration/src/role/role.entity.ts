import { use } from "passport"
import { Association } from "src/associations/association.entity"
import { User } from "src/users/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Role{
    @ManyToOne(type => User,{primary:true,eager:true})
    @JoinColumn()
    user:User
    @ManyToOne(type=>Association,{primary:true,eager:true})
    @JoinColumn()
    association:Association
    @Column()
    name:string


    constructor(name:string,user:User,association:Association){
        this.name=name
        this.association = association
        this.user=user
    }
}