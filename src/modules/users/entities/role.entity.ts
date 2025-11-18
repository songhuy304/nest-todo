import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { ERole } from '@/common/enums';
import { IsEnum } from 'class-validator';
import { BaseEntity } from '@/entities';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ERole })
  @IsEnum(ERole)
  name: ERole;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
