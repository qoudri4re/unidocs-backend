import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Student } from "./student";
import { School } from "./school";

export enum RequestStatus {
  SUBMITTED = "submitted",
  VERIFIED = "verified",
  PROCESSING = "processing",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export enum DeliveryMethod {
  EMAIL = "email",
  COURIER = "courier",
  PICKUP = "pickup",
  INTER_SCHOOL_TRANSFER = "inter_school_transfer",
}

@Table({ tableName: "document_requests", timestamps: true })
export class DocumentRequest extends Model<DocumentRequest> {
  @ForeignKey(() => Student)
  @Column({ type: DataType.BIGINT, allowNull: false })
  student_id!: number;

  @BelongsTo(() => Student)
  student?: Student;

  @ForeignKey(() => School)
  @Column({ type: DataType.BIGINT, allowNull: false })
  school_id!: number;

  @BelongsTo(() => School)
  school?: School;

  @Column({ type: DataType.STRING, allowNull: false })
  document_type!: string;

  @Column({
    type: DataType.ENUM(...Object.values(RequestStatus)),
    allowNull: false,
  })
  status!: RequestStatus;

  @Column({
    type: DataType.ENUM(...Object.values(DeliveryMethod)),
    allowNull: false,
  })
  delivery_method!: DeliveryMethod;

  @Column({ type: DataType.JSON })
  delivery_details?: object;

  @Column({ type: DataType.JSON })
  attached_files?: object;

  @Column({ type: DataType.TEXT })
  admin_comments?: string;
}
