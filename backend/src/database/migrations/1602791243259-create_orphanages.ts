import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602791243259 implements MigrationInterface {

    
    public async up(queryRunner: QueryRunner): Promise<void> {
        // REALIZAR AS ALTERACOES 
        // CRIAR TABELA, CRIAR UM NOVO CAMPO, DELETAR ALGUM CAMPO
        await queryRunner.createTable(new Table({
            name: 'orphanages', // nome que a tabela vai ter no banco de dados
            columns: [ // colunas que vamos ter nos bancos de dados
                {
                    name: 'id', // nome da coluna
                    type: 'integer', // tipo
                    unsigned: true, // nao pode ser negativa (sempre o numero positivo)
                    isPrimary: true, //indica que é a primary key
                    isGenerated: true, // essa coluna vai ser gerada automaticamente
                    generationStrategy: 'increment', // auto increment
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal', // float
                    scale: 10, // numeros depos da virgula
                    precision: 2, // numeros antes da virgula
                },
                {
                    name: 'longitude',
                    type: 'decimal', // float
                    scale: 10, // numeros depos da virgula
                    precision: 2, // numeros antes da virgula
                },
                {
                    name: 'about',
                    type: 'text', // pode receber mais caracteres que varchar
                },
                {
                    name: 'instructions',
                    type: 'text',
                },
                {
                    name: 'opening_hours',
                    type: 'varchar',
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // DESFAZER O QUE FOI FEITO NO UP
        await queryRunner.dropTable('orphanages');
    }

}
