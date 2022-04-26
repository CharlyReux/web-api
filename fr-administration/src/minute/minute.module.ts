import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsModule } from 'src/associations/associations.module';
import { UsersModule } from 'src/users/users.module';
import { MinuteController } from './minute.controller';
import { Minute } from './minute.entity';
import { MinuteService } from './minute.service';

@Module({
    controllers:[MinuteController],
    providers:[MinuteService],
    imports:[UsersModule,AssociationsModule,TypeOrmModule.forFeature([Minute])]
})
export class MinuteModule {
}
