import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn({ type: 'int', generated: true })
  ID!: number;

  @Column({ type: 'varchar', length: 100 })
  NAME!: string;

  @Column({ type: 'varchar', length: 100 })
  DESCRIPTION!: string;

  @Column({ type: 'varchar', length: 100 })
  RESPONSIBLE!: string;
}
