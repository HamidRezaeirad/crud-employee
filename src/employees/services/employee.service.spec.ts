import { Test } from '@nestjs/testing';
import { CreateEmployeeDto } from '../models/create-employee.dto';
import { EmployeeRepository } from '../employee.repository';
import { EmployeesService } from './employees.service';
import { EmployeeStatus } from '../employee-status.enum';
import { FilterEmployeeDto } from '../models/filter-employee.dto';
import { UpdateEmployeeStatus } from '../models/update-employee-status.dto';

const mockEmployeeRepository = () => ({
  getAllEmployees: jest.fn(),
  createEmployee: jest.fn(),
  getEmployeeById: jest.fn(),
  updateEmplpyeeStatus: jest.fn(),
});

const mockEmployees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    status: EmployeeStatus.EMPLOYED,
    id: 'someId',
  },
];

const mockEmployee = {
  firstName: 'John',
  lastName: 'Doe',
  status: EmployeeStatus.EMPLOYED,
  id: 'someId',
};

const mockUpdatedEmployee = {
  firstName: 'John',
  lastName: 'Doe',
  status: EmployeeStatus.UNEMPLOYED,
  id: 'someId',
};

const createEmployeeDto: CreateEmployeeDto = {
  firstName: 'John',
  lastName: 'Doe',
  status: EmployeeStatus.EMPLOYED,
};

describe('EmployeesService', () => {
  let employeesService: EmployeesService;
  let employeesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmployeesService,
        { provide: EmployeeRepository, useFactory: mockEmployeeRepository },
      ],
    }).compile();
    employeesService = module.get(EmployeesService);
    employeesRepository = module.get(EmployeeRepository);
  });

  describe('getEmployees', () => {
    it('calls employeesService.getEmployees and returns the result', async () => {
      employeesRepository.getAllEmployees.mockResolvedValue(mockEmployees);
      const filterEmployeeDto = new FilterEmployeeDto();
      const result = await employeesService.getAllEmployees(filterEmployeeDto);
      expect(result).toEqual(mockEmployees);
    });
  });

  describe('creatEmployee', () => {
    it('calls employeesService.creatEmployee and returns the result', async () => {
      employeesRepository.createEmployee.mockResolvedValue(mockEmployee);
      const result = await employeesService.createNewEmployee(
        createEmployeeDto,
      );
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('getEmployeeById', () => {
    it('calls employeesService.getEmployeeById and returns the result', async () => {
      employeesRepository.getEmployeeById.mockResolvedValue(mockEmployee);
      const result = await employeesService.getEmployeeById('someId');
      expect(result).toEqual(mockEmployee);
    });

    it('calls employeesService.getEmployeeById and handles an error', async () => {
      employeesRepository.getEmployeeById.mockResolvedValue(null);
      const employee = await employeesService.getEmployeeById('someId');
      expect(employee).toBe(null);
    });
  });

  describe('updateEmployeeStatus', () => {
    it('calls EmployeesController.updateEmployeeStatus and returns the result', async () => {
      employeesRepository.updateEmplpyeeStatus.mockResolvedValue(
        mockUpdatedEmployee,
      );
      const updateEmployeeStatus = new UpdateEmployeeStatus();
      updateEmployeeStatus.status = EmployeeStatus.UNEMPLOYED;
      const employee = await employeesService.upateEmployeeStatus(
        'someId',
        updateEmployeeStatus,
      );
      const { firstName, lastName } = mockUpdatedEmployee;
      expect(employee).toHaveProperty('firstName', firstName);
      expect(employee).toHaveProperty('lastName', lastName);
      expect(employee).toHaveProperty('status', updateEmployeeStatus.status);
    });
  });
});
