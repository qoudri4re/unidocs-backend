import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "audit_logs", timestamps: false })
export class AuditLog extends Model<AuditLog> {
  @Column({ type: DataType.UUID, allowNull: false })
  user_id!: string;

  @Column({ type: DataType.ENUM("student", "school_admin"), allowNull: false })
  user_type!: "student" | "school_admin";

  @Column({ type: DataType.STRING, allowNull: false })
  action_type!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  created_at!: Date;
}
