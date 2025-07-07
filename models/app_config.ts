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
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  config_id!: number;

  @ForeignKey(() => School)
  @Column({ type: DataType.BIGINT, allowNull: false })
  school_id!: number;

  @BelongsTo(() => School)
  school?: School;

  @Column({ type: DataType.STRING, allowNull: false })
  config_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  config_value!: string;
}
