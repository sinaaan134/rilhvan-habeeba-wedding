import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const wishes = sqliteTable('wishes',{id:text('id').primaryKey(),name:text('name').notNull(),message:text('message').notNull(),createdAt:integer('created_at').notNull()});
export const events = sqliteTable('events',{id:text('id').primaryKey(),kind:text('kind').notNull(),visitor:text('visitor').notNull(),device:text('device').notNull(),language:text('language').notNull(),createdAt:integer('created_at').notNull()});
