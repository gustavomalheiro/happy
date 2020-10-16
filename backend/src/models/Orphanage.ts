import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

// um decorator é basicamente utilizado na classe, em propriedades ou em funções
@Entity('orphanages') // automaticamente, o type orm vai entender que essa classe esta associada com a nossa tabela orphanages
export default class Orphanage {
    @PrimaryGeneratedColumn('increment') // indica que é a chave primaria
    id: number;

    @Column() // indica que cada um desses carinhas representa uma coluna no banco de dados
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: Image[];
}