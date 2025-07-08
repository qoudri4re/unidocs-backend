import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { School } from "./school";

@Table({ tableName: "document_types", timestamps: true })
export class DocumentType extends Model<DocumentType> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => School)
  @Column({ type: DataType.UUID, allowNull: false })
  school_id!: string;

  @BelongsTo(() => School)
  school?: School;

  @Column({ type: DataType.STRING, allowNull: false })
  document_name!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price!: number;
}
