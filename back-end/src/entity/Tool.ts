import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export default class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, collation: 'und-x-icu' })
  @IsNotEmpty()
  title: string;

  @Column({ nullable: false, collation: 'und-x-icu' })
  @IsNotEmpty()
  link: string;

  @Column({ nullable: false, collation: 'und-x-icu' })
  @IsNotEmpty()
  description: string;

  @Column({ array: true, nullable: false, collation: 'und-x-icu' })
  @IsNotEmpty()
  tags: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
