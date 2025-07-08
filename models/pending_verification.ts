import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
import { PendingVerificationCreationAttributes } from "../interfaces/student/pendingVerification";

@Table({ tableName: "pending_verifications", timestamps: false })
export class PendingVerification extends Model<
  PendingVerification,
  PendingVerificationCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  contact_value!: string; // email or phone number

  @Column({ type: DataType.STRING, allowNull: false })
  otp!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expires_at!: Date;

  @Default(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  verified!: boolean;

  @Column({ type: DataType.JSON })
  user_payload!: {
    full_name: string;
    email: string;
    phone_number: string;
    preferred_verification_channel: "email" | "phone";
  };
}
