import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * BaseEntity is an abstract base class for entities. All entities in application can extend this class and use the benefit of pre-defined columns.
 *
 * @property id: string(uuid)
 * @property createDateTime: datetime(default: current)
 * @property UpdateDateColumn: datetime(default: current)
 * @property isDeleted: boolean
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updateDateTime: Date;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
