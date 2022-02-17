import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../shared/base.entity';
import { EmployeeStatus } from '../employee-status.enum';

@Entity()
export class EmployeeEntity extends BaseEntity {
  @ApiProperty({
    example: 'Hamid',
    description: 'The firstName of the Employee',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Rezaeirad',
    description: 'The lastName of the Employee',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'EMPLOYED',
    description: 'Either EMPLOYED or UNEMPLOYED',
  })
  @Column()
  status: EmployeeStatus;
}
