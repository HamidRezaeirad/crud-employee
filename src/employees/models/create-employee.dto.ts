import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { EmployeeStatus } from '../employee-status.enum';

export class CreateEmployeeDto {
  @MinLength(1)
  @MaxLength(256)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The firstName of an employee',
    minimum: 1,
    maxLength: 256,
  })
  firstName: string;

  @MinLength(1)
  @MaxLength(256)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The lastName of an employee',
    minimum: 1,
    maxLength: 256,
  })
  lastName: string;

  @IsEnum(EmployeeStatus)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The employee status Either EMPLOYED or UNEMPLOYED',
  })
  status: EmployeeStatus;
}
