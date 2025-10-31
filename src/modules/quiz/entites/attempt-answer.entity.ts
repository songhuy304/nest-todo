import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { QuizAttempt } from './quiz-attempt.entity';
import { Question } from './question.entity';
import { Option } from './option.entity';

@Entity('attempt_answers')
export class AttemptAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuizAttempt, (attempt) => attempt.answers)
  attempt: QuizAttempt;

  @ManyToOne(() => Question)
  question: Question;

  @ManyToOne(() => Option)
  option: Option;

  @Column({ default: false })
  isCorrect: boolean;
}
