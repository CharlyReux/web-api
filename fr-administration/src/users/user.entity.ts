import { Association } from "src/associations/association.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    lastname:string
    @Column()
    firstname:string
    @Column()
    age:number
    @Column()
    password:string


    constructor(id:number, lastname:string,firstname:string,age:number){
        this.id=id
        this.lastname=lastname
        this.firstname=firstname
        this.age=age
    }
}