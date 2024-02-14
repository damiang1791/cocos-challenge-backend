import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../src/core/entities/user.entity';

export const userRepositoryMock = {
  findOneBy: jest.fn(),
};

export const clearUserRepositoryMocks = (): void => {
  Object.values(userRepositoryMock).forEach((mockFunction) =>
    mockFunction.mockReset(),
  );
};

export const mockUserRepository = (app: INestApplication) => {
  const userRepository = app.get<Repository<UserEntity>>(
    getRepositoryToken(UserEntity),
  );

  Object.assign(userRepository, userRepositoryMock);
};
