import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Student } from "./student";

export enum TicketStatus {
  OPEN = "open",
  UNDER_REVIEW = "under_review",
  RESOLVED = "resolved",
}

@Table({ tableName: "support_tickets", timestamps: true })
export class SupportTicket extends Model<SupportTicket> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Student)
  @Column({ type: DataType.UUID, allowNull: false })
  student_id!: string;

  @BelongsTo(() => Student)
  student?: Student;

  @Column({ type: DataType.STRING, allowNull: false })
  subject!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  message!: string;

  @Column({
    type: DataType.ENUM(...Object.values(TicketStatus)),
    allowNull: false,
  })
  status!: TicketStatus;
}
