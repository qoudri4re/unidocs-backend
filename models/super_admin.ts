import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'super_admins', timestamps: true })
export class SuperAdmin extends Model<SuperAdmin> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password_hash!: string;
}
