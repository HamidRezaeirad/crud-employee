import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { CreateEmployeeDto } from './models/create-employee.dto';
import { FilterEmployeeDto } from './models/filter-employee.dto';
import { UpdateEmployeeStatus } from './models/update-employee-status.dto';

@EntityRepository(EmployeeEntity)
export class EmployeeRepository extends Repository<EmployeeEntity> {
  async getAllEmployees(filter: FilterEmployeeDto): Promise<EmployeeEntity[]> {
    const { firstName, lastName, status } = filter;

    const query = this.createQueryBuilder('employees');

    if (firstName) {
      query.andWhere('LOWER(employees.firstName) like :firstName', {
        firstName: `%${firstName.toLowerCase()}%`,
      });
    }

    if (lastName) {
      query.andWhere('LOWER(employees.lastName) like :lastName', {
        lastName: `%${lastName.toLowerCase()}%`,
      });
    }

    if (status) {
      query.andWhere('LOWER(employees.status) = :status', {
        status: `${status.toLowerCase()}`,
      });
    }

    return await query.getMany();
  }

  async getEmployeeById(id: string): Promise<EmployeeEntity> {
    const employee = await this.findOne({ where: { id } });

    if (!employee) {
      throw new NotFoundException(`Employee by id ${id} not found!`);
    }

    return employee;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const { firstName, lastName, status } = createEmployeeDto;
    const employeeEntity: EmployeeEntity = this.create({
      firstName,
      lastName,
      status,
    });

    await this.save(employeeEntity);

    return employeeEntity;
  }

  async updateEmplpyeeStatus(
    id: string,
    updateEmployeeStatus: UpdateEmployeeStatus,
  ): Promise<EmployeeEntity> {
    const employee: EmployeeEntity = await this.getEmployeeById(id);

    employee.status = updateEmployeeStatus.status;
    return await this.save(employee);
  }
}
