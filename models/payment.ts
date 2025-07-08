import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { DocumentRequest } from "./document_request";
import { Student } from "./student";

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESSFUL = "successful",
  FAILED = "failed",
}

export enum PaymentMethod {
  PAYSTACK = "Paystack",
  FLUTTERWAVE = "Flutterwave",
}

@Table({ tableName: "payments", timestamps: false })
export class Payment extends Model<Payment> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => DocumentRequest)
  @Column({ type: DataType.UUID, allowNull: false })
  document_request_id!: string;

  @BelongsTo(() => DocumentRequest)
  documentRequest?: DocumentRequest;

  @ForeignKey(() => Student)
  @Column({ type: DataType.UUID, allowNull: false })
  student_id!: string;

  @BelongsTo(() => Student)
  student?: Student;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount!: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false,
  })
  payment_method!: PaymentMethod;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    allowNull: false,
  })
  status!: PaymentStatus;

  @Column({ type: DataType.STRING })
  gateway_reference?: string;

  @Column({ type: DataType.DATE })
  paid_at?: Date;
}
