import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { Option } from './option.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @Column('text')
  questionText: string;

  @Column({ default: 'single_choice' })
  questionType: 'single_choice' | 'multiple_choice' | 'true_false';

  @Column({ default: 1 })
  points: number;

  @Column({ default: 0 })
  orderIndex: number;

  @OneToMany(() => Option, (opt) => opt.question)
  options: Option[];
}
