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

  @ForeignKey(() => School)
  @Column({ type: DataType.UUID, allowNull: false })
  school_id!: string;

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
