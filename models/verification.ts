import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Document } from './document';

export enum VerificationStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

@Table({ tableName: 'verifications', timestamps: true })
export class Verification extends Model<Verification> {
  @ForeignKey(() => Document)
  @Column({ type: DataType.BIGINT, allowNull: false })
  document_id!: number;

  @BelongsTo(() => Document)
  document?: Document;



  @Column({ type: DataType.ENUM(...Object.values(VerificationStatus)), allowNull: false })
  status!: VerificationStatus;
}
