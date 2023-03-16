import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entity/user';
import { Blog } from '../../entity/blog';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
      });
      await sequelize.addModels([User, Blog]);
      await User.sync({ force: true });
      await Blog.sync({ force: true });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
