import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Option } from './option.entity';
import { EQuestionType } from '@/common/enums/';
import { Quiz } from './quiz.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @Column('text')
  questionText: string;

  @Column({ type: 'enum', enum: EQuestionType })
  questionType: EQuestionType;

  @Column({ default: 1 })
  points: number;

  @Column({ default: 0 })
  orderIndex: number;

  @OneToMany(() => Option, (opt) => opt.question)
  options: Option[];
}
