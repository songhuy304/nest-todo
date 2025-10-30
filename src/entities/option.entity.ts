import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, (q) => q.options)
  question: Question;

  @Column('text')
  text: string;

  @Column({ default: false })
  isCorrect: boolean;
}
