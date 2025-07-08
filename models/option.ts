import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

@Table({ tableName: "options", timestamps: false })
export class Option extends Model<Option> {
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
