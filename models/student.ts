import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  Unique,
} from "sequelize-typescript";
import { StudentCreationAttributes } from "../interfaces/student/student.interface";

@Table({
  tableName: "students",
  timestamps: true,
  scopes: {
    withPassword: {
      attributes: {
        include: ["password"],
      },
    },
    forStudent: {
      attributes: {
        exclude: ["password"],
      },
    },
  },
})
export class Student extends Model<Student, StudentCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  full_name!: string;

  @Unique({ name: "unique_email", msg: "Email must be unique" })
  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Unique({ name: "unique_phone_number", msg: "Phone number must be unique" })
  @Column({ type: DataType.STRING })
  phone_number?: string;

  @Unique({ name: "unique_matric_number", msg: "Matric number must be unique" })
  @Column({ type: DataType.STRING })
  matric_number?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  graduation_year?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  program?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  department?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  uploaded_id_card_url?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  uploaded_image_url?: string;

  @Column({ type: DataType.UUID, allowNull: true })
  school_id?: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_verified_by_school!: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_phone_number_verified!: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_email_verified!: boolean;
}
