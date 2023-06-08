import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
    padron!: string;

  @Column()
    nombre!: string;

  @Column()
    apellido!: string;

  @Column()
    edad!: number;
}

@Entity()
export class Carreras {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  duracion!: number;
}

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  codigo!: number;

  @Column()
  nombre!: string;

  @Column()
  creditos!: number;

  @Column()
  carreraId!: number;
}

@Entity()
export class AlumnoCarrera {
  @Column()
  alumnoPadron!: number;

  @Column()
  carreraId!: number;
}

@Entity()
export class AlumnoMateria {
  @Column()
  alumnoPadron!: number;

  @Column()
  materiaCodigo!: string;
}

@Entity()
export class Correlativas {
  @Column()
  materiaCodigo!: string;

  @Column()
  correlativaCodigo!: string;
}
