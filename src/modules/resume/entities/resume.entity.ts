import { BaseEntity } from '@/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@/modules/users/entities';
import {
  CertificationResume,
  EducationResume,
  ExperienceResume,
  PersonalInformationResumeDto,
  ProjectResume,
} from '../interfaces';

@Entity('resumes')
export class Resume extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url?: string;

  @Column({ type: 'json', nullable: true })
  personalInformation: PersonalInformationResumeDto;

  @Column({ type: 'json', nullable: true })
  experiences: ExperienceResume[];

  @Column({ type: 'json', nullable: true })
  educations: EducationResume[];

  @Column({ type: 'json', nullable: true })
  projects: ProjectResume[];

  @Column({ type: 'longtext', nullable: true })
  skill: string;

  @Column({ type: 'json', nullable: true })
  certifications: CertificationResume[];

  @OneToOne(() => User, (user) => user.resume)
  @JoinColumn()
  user: User;
}
