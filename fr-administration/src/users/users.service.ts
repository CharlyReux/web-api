import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    currentId: number = 0


    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    public async create(lastname: string, firstname: string, age: number,password:string):Promise<User>{
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const us: User = this.repository.create({
            id: ++this.currentId, 
            lastname: lastname, 
            firstname: firstname, 
            age: age,
            password:hash 
        })
        this.repository.save(us)
        return us
    }
    public async getUsers():Promise<User[]>{
        return this.repository.find()
    }

    public async getUserByID(id:number):Promise<User>{
        return this.repository.findOne({id:Equal(+id)})
    }

    public async UpdateUserByID(id:number,lastname:string,firstname:string,age:number):Promise<User>{
        const us = await this.getUserByID(+id)

        if (firstname !== undefined) {
             us.firstname = firstname
        }
        if (lastname !== undefined) {
            us.lastname = lastname
        }
        if (lastname !== undefined) {
            us.age = +age
        }
        this.repository.save(us)
        return us;

    }
    public async DeleteUserByID(id:number):Promise<boolean>{
        return (await this.repository.delete({id:Equal(+id)})).affected!=0;
    }
    
}
