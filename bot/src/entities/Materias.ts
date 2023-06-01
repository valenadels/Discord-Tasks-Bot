import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Carrera } from "./Carreras";

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cantidadDeCreditos!: number;

  @Column()
  nombre!: string;

  @Column()
  codigo!: string;

  @ManyToOne(() => Carrera, carrera => carrera.materias)
  carrera!: Carrera;
}
