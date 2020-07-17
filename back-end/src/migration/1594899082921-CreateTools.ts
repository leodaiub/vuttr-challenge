import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTools1594899082921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tools',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'link',
            type: 'string',
          },
          {
            name: 'description',
            type: 'string',
          },
          {
            name: 'tags',
            type: 'string[]',
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('question');
  }
}
