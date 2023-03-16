import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'blogs',
})
export class Blog extends Model<Blog> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: 'id',
    type: DataType.INTEGER,
  })
  id: string;

  @Column({
    field: 'title',
    type: DataType.STRING,
  })
  title: string;

  @Column({
    field: 'content',
    type: DataType.STRING,
  })
  content: string;
}
