import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../models/create-employee.dto';
import { FilterEmployeeDto } from '../models/filter-employee.dto';
import { UpdateEmployeeStatus } from '../models/update-employee-status.dto';
import { EmployeesService } from '../services/employees.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all employee' })
  @ApiResponse({
    status: 200,
    description: 'Return array of employee.',
    type: [EmployeeEntity],
  })
  getAllEmployees(
    @Query() filter: FilterEmployeeDto,
  ): Promise<EmployeeEntity[]> {
    return this.employeeService.getAllEmployees(filter);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Employee Id' })
  @ApiOperation({ summary: 'Get an employee by id' })
  @ApiResponse({
    status: 200,
    description: 'Return employee by id.',
    type: EmployeeEntity,
  })
  getEmployeeById(@Param('id') id: string): Promise<EmployeeEntity> {
    return this.employeeService.getEmployeeById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create employee' })
  @ApiResponse({
    status: 201,
    description: 'Employee has been successfully created.',
    type: EmployeeEntity,
  })
  createNewEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeEntity> {
    return this.employeeService.createNewEmployee(createEmployeeDto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update employee status' })
  @ApiResponse({
    status: 200,
    description: 'Employee status has been successfully update.',
    type: EmployeeEntity,
  })
  updateEmployeeStatus(
    @Param('id') id: string,
    @Body() updateEmployeeStatus: UpdateEmployeeStatus,
  ): Promise<EmployeeEntity> {
    return this.employeeService.upateEmployeeStatus(id, updateEmployeeStatus);
  }
}
