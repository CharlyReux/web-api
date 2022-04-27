import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsModule } from 'src/associations/associations.module';
import { UsersModule } from 'src/users/users.module';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers:[RoleService],
  imports:[
    forwardRef(()=> AssociationsModule),forwardRef(()=>UsersModule),TypeOrmModule.forFeature([Role])],
    exports:[RoleService]
})
export class RoleModule {}
