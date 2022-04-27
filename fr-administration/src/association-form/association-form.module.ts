import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationFormController } from './association-form.controller';
import { AssociationForm } from './association-form.entity';
import { AssociationFormService } from './association-form.service';

@Module({
  controllers: [AssociationFormController],
  providers: [AssociationFormService],
  imports:[TypeOrmModule.forFeature([AssociationForm])]
})
export class AssociationFormModule {}
