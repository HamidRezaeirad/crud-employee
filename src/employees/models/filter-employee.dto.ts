import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EmployeeStatus } from '../employee-status.enum';

export class FilterEmployeeDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The fisrtName of an employee',
    required: false,
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The lastName of an employee',
    required: false,
  })
  lastName: string;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  @ApiProperty({
    description: 'The status of an employee Either EMPLOYED or UNEMPLOYED',
    required: false,
  })
  status: EmployeeStatus;
}
