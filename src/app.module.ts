import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlite_connection } from './db.config';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [TypeOrmModule.forRoot(sqlite_connection), EmployeesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
