import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema({
  name: 'User',
  target: 'User',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    password: {
      type: 'varchar'
    }
  },
});