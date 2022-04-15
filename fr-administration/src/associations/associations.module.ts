import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';
import { Association } from './association.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AssociationsController,],
  providers: [AssociationsService],
  imports: [UsersModule,TypeOrmModule.forFeature([Association])]
})
export class AssociationsModule {}
