import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EmployeeStatus } from '../employee-status.enum';

export class UpdateEmployeeStatus {
  @ApiProperty({ description: 'Either EMPLOYED or UNEMPLOYED' })
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;
}
