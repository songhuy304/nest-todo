// src/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Role } from './role.entity';
import { Quiz, QuizAttempt } from '@/modules/quiz/entites';
import { BaseEntity } from '@/entities';
import { Resume } from '@/modules/resume/entities';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  fullName: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  streakCount: number;

  @Column({ default: 0 })
  xpPoints: number;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role: Role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Quiz, (quiz) => quiz.createdBy)
  quizzes: Quiz[];

  @OneToOne(() => Resume, (resume) => resume.user)
  resume: Resume;

  @OneToMany(() => QuizAttempt, (attempt) => attempt.user)
  attempts: QuizAttempt[];
}
