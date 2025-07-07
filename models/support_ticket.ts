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
  @ForeignKey(() => Student)
  @Column({ type: DataType.BIGINT, allowNull: false })
  student_id!: number;

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
