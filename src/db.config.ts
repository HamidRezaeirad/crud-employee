import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { root } from './path';
export const sqlite_connection: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: `${root}/data/logdb.db`,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  keepConnectionAlive: true,
};

export const sqlite_connection_test: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: `${root}/data/logdb-test.db`,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  keepConnectionAlive: true,
};
