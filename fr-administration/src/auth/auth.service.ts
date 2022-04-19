import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private UsService: UsersService,
        private jwtService: JwtService
        ) { }

    public async validateUser(id: number, password: string): Promise<User> {
        const us: User = await this.UsService.getUserByID(id);

        if (!bcrypt.compare(us.password, password)) {
            return undefined
        } else {
            return us
        }
    }
    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
