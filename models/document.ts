import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import { DocumentRequest } from "./document_request";
import { Student } from "./student";

@Table({ tableName: "documents", timestamps: true })
export class Document extends Model<Document> {
  @ForeignKey(() => DocumentRequest)
  @Column({ type: DataType.BIGINT, allowNull: false })
  document_request_id!: number;

  @BelongsTo(() => DocumentRequest)
  documentRequest?: DocumentRequest;

  @Column({ type: DataType.STRING, allowNull: false })
  file_url!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  file_type!: string;

  @ForeignKey(() => Student)
  @Column({ type: DataType.BIGINT })
  issued_by_student_id?: number;

  @BelongsTo(() => Student, "issued_by_student_id")
  issuedByStudent?: Student;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_digitally_signed!: boolean;

  @Unique({
    name: "unique_verification_code",
    msg: "Verification code must be unique",
  })
  @Column({ type: DataType.STRING })
  verification_code?: string;
}
