import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602799127520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id', // nome da coluna
                    type: 'integer', // tipo
                    unsigned: true, // nao pode ser negativa (sempre o numero positivo)
                    isPrimary: true, //indica que é a primary key
                    isGenerated: true, // essa coluna vai ser gerada automaticamente
                    generationStrategy: 'increment', // auto increment
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE', // altera o id de forma automática pra gente
                    onDelete: 'CASCADE', // deleta as imagens junto com o orfanato
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }
}
