import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Alumno {
  @PrimaryColumn()
  padron!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  edad!: number;
}

@Entity()
export class Carreras {
  @PrimaryColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ type: "float" })
  duracion!: number;
}

@Entity()
export class Materia {
  @PrimaryColumn()
  codigo!: string;

  @Column()
  nombre!: string;

  @Column()
  creditos!: number;

  @Column()
  carrera_id!: number;
}

@Entity()
export class AlumnoCarrera {
  @PrimaryColumn()
  alumno_padron!: number;

  @PrimaryColumn()
  carrera_id!: number;
}

@Entity()
export class AlumnoMateria {
  @PrimaryColumn()
  alumno_padron!: number;

  @PrimaryColumn()
  materia_codigo!: string;
}

@Entity()
export class Correlativas {
  @PrimaryColumn()
  materia_codigo!: string;

  @PrimaryColumn()
  correlativa_codigo!: string;
}


