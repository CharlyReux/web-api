import { Test, TestingModule } from '@nestjs/testing';
import { AssociationFormService } from './association-form.service';

describe('AssociationFormService', () => {
  let service: AssociationFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociationFormService],
    }).compile();

    service = module.get<AssociationFormService>(AssociationFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
