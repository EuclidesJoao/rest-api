import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserRoleEntity } from "./user-roles.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  firstName: string;

  @Column({type: 'varchar'})
  lastName: string;

  @Column({type: 'date'})
  birthdate: Date;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'varchar'})
  phone: string;

  @Column({type: 'varchar'})
  password: string

  @ManyToOne(()=>UserRoleEntity, type=>type.id)
  @JoinColumn({name: 'fkUserRole'})
  fkUserRole: number
}
