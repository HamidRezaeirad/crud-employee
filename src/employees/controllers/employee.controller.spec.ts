import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlite_connection_test } from '../../db.config';
import { CreateEmployeeDto } from '../models/create-employee.dto';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeeRepository } from '../employee.repository';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from '../services/employees.service';
import { EmployeeStatus } from '../employee-status.enum';
import { FilterEmployeeDto } from '../models/filter-employee.dto';
import { UpdateEmployeeStatus } from '../models/update-employee-status.dto';

const createEmployeeDto: CreateEmployeeDto = {
  firstName: 'John',
  lastName: 'Doe',
  status: EmployeeStatus.EMPLOYED,
};

let employee: EmployeeEntity;

describe('EmployeesController', () => {
  let employeesController: EmployeesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(sqlite_connection_test),
        TypeOrmModule.forFeature([EmployeeRepository]),
      ],
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    employeesController = module.get<EmployeesController>(EmployeesController);
  });

  describe('createEmployee', () => {
    it('calls EmployeesController.createNewEmployee and returns the result', async () => {
      employee = await employeesController.createNewEmployee(createEmployeeDto);
      const { firstName, lastName } = createEmployeeDto;
      expect(employee).toHaveProperty('firstName', firstName);
      expect(employee).toHaveProperty('lastName', lastName);
    });
  });

  describe('getEmployees', () => {
    it('calls EmployeesController.getAllEmployees and returns the result', async () => {
      const { firstName, lastName } = createEmployeeDto;

      const filterEmployeeDto = new FilterEmployeeDto();
      const result = await employeesController.getAllEmployees(
        filterEmployeeDto,
      );

      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0]).toHaveProperty('firstName', firstName);
      expect(result[0]).toHaveProperty('lastName', lastName);
    });
  });

  describe('getEmployeeById', () => {
    it('calls EmployeesController.getEmployeeById and returns the result', async () => {
      const result = await employeesController.getEmployeeById(employee.id);
      const { firstName, lastName } = employee;

      expect(result).toHaveProperty('firstName', firstName);
      expect(result).toHaveProperty('lastName', lastName);
    });
  });

  describe('updateEmployeeStatus', () => {
    it('calls EmployeesController.updateEmployeeStatus and returns the result', async () => {
      const updateEmployeeStatus = new UpdateEmployeeStatus();
      updateEmployeeStatus.status = EmployeeStatus.UNEMPLOYED;

      const result = await employeesController.updateEmployeeStatus(
        employee.id,
        updateEmployeeStatus,
      );

      const { firstName, lastName } = employee;
      expect(result).toHaveProperty('firstName', firstName);
      expect(result).toHaveProperty('lastName', lastName);
      expect(result).toHaveProperty('status', updateEmployeeStatus.status);
    });
  });
});
