import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: 'id',
    type: DataType.INTEGER,
  })
  id: string;

  @Column({
    field: 'email',
    type: DataType.STRING,
  })
  email: string;

  @Column({
    field: 'password',
    type: DataType.STRING,
  })
  password: string;

  @Column({
    field: 'firstName',
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    field: 'lastName;',
    type: DataType.STRING,
  })
  lastName: string;
}
