import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from '../employee.repository';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../models/create-employee.dto';
import { FilterEmployeeDto } from '../models/filter-employee.dto';
import { UpdateEmployeeStatus } from '../models/update-employee-status.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async getAllEmployees(filter: FilterEmployeeDto): Promise<EmployeeEntity[]> {
    return await this.employeeRepository.getAllEmployees(filter);
  }

  async getEmployeeById(id: string): Promise<EmployeeEntity> {
    return await this.employeeRepository.getEmployeeById(id);
  }

  async createNewEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return await this.employeeRepository.createEmployee(createEmployeeDto);
  }

  upateEmployeeStatus(
    id: string,
    updateEmployeeStatus: UpdateEmployeeStatus,
  ): Promise<EmployeeEntity> {
    return this.employeeRepository.updateEmplpyeeStatus(
      id,
      updateEmployeeStatus,
    );
  }
}
