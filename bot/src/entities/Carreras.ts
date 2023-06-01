import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Materia } from "./Materias";

@Entity()
export class Carrera {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  duracion!: number;

  @OneToMany(() => Materia, materia => materia.carrera)
  materias!: Materia[];
}
