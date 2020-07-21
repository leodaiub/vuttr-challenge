import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, collation: 'UTF8_GENERAL_CI' })
  title: string;

  @Column({ nullable: false, collation: 'UTF8_GENERAL_CI' })
  link: string;

  @Column({ nullable: false, collation: 'UTF8_GENERAL_CI' })
  description: string;

  @Column({ array: true, nullable: false, collation: 'UTF8_GENERAL_CI' })
  tags: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
