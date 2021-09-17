import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    id: number;   
    
    @Column({ type: "varchar", length: 20 })
    codigo: string;
    
    @Column({ type: "varchar", length: 100 })
    nome: string;
    
    @Column('decimal')
    preco: number;
}