import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanage from './Orphanage';

// um decorator é basicamente utilizado na classe, em propriedades ou em funções
@Entity('images') // automaticamente, o type orm vai entender que essa classe esta associada com a nossa tabela orphanages
export default class Image {
    @PrimaryGeneratedColumn('increment') // indica que é a chave primaria
    id: number;

    @Column() // indica que cada um desses carinhas representa uma coluna no banco de dados
    path: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage;
}