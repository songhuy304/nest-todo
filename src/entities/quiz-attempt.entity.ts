import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { User } from './user.entity';
import { AttemptAnswer } from './attempt-answer.entity';

@Entity('quiz_attempts')
export class QuizAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.attempts)
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.attempts)
  user: User;

  @Column({ default: 0 })
  score: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date;

  @Column({ nullable: true })
  durationSeconds?: number;

  @OneToMany(() => AttemptAnswer, (a) => a.attempt)
  answers: AttemptAnswer[];
}
