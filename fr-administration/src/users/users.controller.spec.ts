import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }]
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return an array of users', async () => {
      const expected = Promise.all([{
        id: 0,
        firstname: 'John',
        lastname: 'Doe',
        age: 23,
        password:"1234"
      }]);
      jest.spyOn(service, 'getUsers').mockImplementation(() => expected);
      expect(await controller.get()).toBe(await expected);
    });
  });

  describe('getById', () => {
    it('should return a single user, with the provided id', async () => {
      const expected = await Promise.all([
        {
          id: 0,
          firstname: 'John',
          lastname: 'Doe',
          age: 23,
          password:"1234"
        }
      ]);
      jest.spyOn(service, "getUserByID").mockImplementation(id => {
        return Promise.resolve(expected[id]);
      });
      expect(await controller.getUserByID(0)).toBe(await expected[0]);
    })
  });

  describe('UpdateUserByID', () => {
    it('should return a single user, with the provided changes', async () => {
      const expected = await Promise.all([
        {
          id: 0,
          firstname: 'Jane',
          lastname: 'Doe',
          age: 23,
          password:"1234"
        }
      ]);
      jest.spyOn(service, "UpdateUserByID").mockImplementation(id => {
        expected[id].age = 24
        return Promise.resolve(expected[id]);
      });
      expect(await controller.UpdateUserByID(0, { age: 24 })).toBe(await expected[0]);
    })
  });

  describe('create', () => {
    it('should return a single user, with the provided id', async () => {
      const expected = await Promise.all([
        {
          id: 0,
          firstname: 'John',
          lastname: 'Doe',
          age: 23,
          password:"1234"
        }
      ]);
      const input =
      {
        id: 0,
        firstname: 'John',
        lastname: 'Doe',
        age: 23,
        password:"1234"
      };
      jest.spyOn(service, "create").mockImplementation(() => {
        return Promise.resolve(input);
      });
      console.log(input)
      expect(await controller.create(input)).toStrictEqual(await expected[0]);
    })
  });

});
