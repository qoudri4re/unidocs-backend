import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({ tableName: "schools", timestamps: true })
export class School extends Model<School> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name!: string;

  @Column({ type: DataType.STRING })
  campus_address?: string;

  @Column({ type: DataType.STRING })
  contact_email?: string;

  @Column({ type: DataType.STRING })
  logo_url?: string;


}
