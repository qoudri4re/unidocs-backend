import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "school_admins", timestamps: true })
export class SchoolAdmin extends Model<SchoolAdmin> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password_hash!: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "admin" })
  role!: string;

  @Column({ type: DataType.UUID, allowNull: false })
  school_id!: string;
}
