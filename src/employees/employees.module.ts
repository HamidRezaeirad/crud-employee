import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './controllers/employees.controller';
import { EmployeeRepository } from './employee.repository';
import { EmployeesService } from './services/employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRepository])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
