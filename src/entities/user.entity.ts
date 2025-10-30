// src/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';
import { Quiz } from './quiz.entity';
import { QuizAttempt } from './quiz-attempt.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role: Role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Quiz, (quiz) => quiz.createdBy)
  quizzes: Quiz[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.user)
  attempts: QuizAttempt[];
}
