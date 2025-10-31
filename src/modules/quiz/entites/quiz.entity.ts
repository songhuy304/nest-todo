import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../../entities/user.entity';
import { Question } from './question.entity';
import { QuizAttempt } from './quiz-attempt.entity';
import { BaseEntity } from '../../../entities/base.entity';

@Entity('quizzes')
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: 'public' })
  visibility: 'public' | 'private';

  @ManyToOne(() => User, (user) => user.quizzes)
  createdBy: User;

  @OneToMany(() => Question, (q) => q.quiz)
  questions: Question[];

  @OneToMany(() => QuizAttempt, (attempt) => attempt.quiz)
  attempts: QuizAttempt[];
}
