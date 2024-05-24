import {Entity, BaseEntity, EntitySchema, } from 'typeorm'


export const MessageSchema = new EntitySchema({
  name: 'Message',
  target: 'Message',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    content: {
      type: 'text'
    },
    user: {
      type: 'text'
    }
  }
})