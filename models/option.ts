import { Table, Column, Model, DataType } from "sequelize-typescript";
import { OptionCreationAttributes } from "../interfaces/super-admin/option.interface";

@Table({ tableName: "options", timestamps: false })
export class Option extends Model<Option, OptionCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  option_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  option_type!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  option_value!: string;
}
