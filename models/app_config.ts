import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import { School } from "./school";

@Table({ tableName: "app_configs", timestamps: true })
export class AppConfig extends Model<AppConfig> {
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
  config_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  config_value!: string;
}
