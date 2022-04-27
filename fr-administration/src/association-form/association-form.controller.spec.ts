import { Test, TestingModule } from '@nestjs/testing';
import { AssociationFormController } from './association-form.controller';

describe('AssociationFormController', () => {
  let controller: AssociationFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationFormController],
    }).compile();

    controller = module.get<AssociationFormController>(AssociationFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
