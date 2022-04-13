import { Injectable } from '@nestjs/common';
import { User } from './user.entity';


const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age:23
    }
]


@Injectable()
export class UsersService {
    currentId: number = 0

    create(lastname: string, firstname: string, age: number):User{
        const us: User = new User(++this.currentId, lastname,firstname,age)
        users.push(us)
        return us
    }
    getUsers(){
        return users
    }

    getUserByID(id:number):User{
        return users.find(x => x.id === +id)
    }

    UpdateUserByID(id:number,lastname:string,firstname:string,age:number):User{
        const us = users.find(x => x.id === +id)

        if (firstname !== undefined) {
            us.firstname = firstname
        }
        if (lastname !== undefined) {
            us.lastname = lastname
        }
        if (lastname !== undefined) {
            us.age = +age
        }
        return us;

    }
    DeleteUserByID(id:number):boolean{
        const before: number = users.length

        users.splice(+id,1)

        return before!==users.length;
    }
    
}
