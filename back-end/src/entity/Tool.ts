/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  link: string;

  @Column({ nullable: false })
  description: string;

  @Column({ array: true, nullable: false })
  tags: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
