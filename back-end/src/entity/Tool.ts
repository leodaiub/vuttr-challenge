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

  @Column({ nullable: false, collation: 'und-x-icu' })
  title: string;

  @Column({ nullable: false, collation: 'und-x-icu' })
  link: string;

  @Column({ nullable: false, collation: 'und-x-icu' })
  description: string;

  @Column({ array: true, nullable: false, collation: 'und-x-icu' })
  tags: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
