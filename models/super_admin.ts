import { Table, Column, Model, DataType } from "sequelize-typescript";
import { SuperAdminCreationAttributes } from "../interfaces/super-admin/super-admin.interface";

@Table({ tableName: "super_admins", timestamps: true })
export class SuperAdmin extends Model<
  SuperAdmin,
  SuperAdminCreationAttributes
> {
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
  password!: string;
}
