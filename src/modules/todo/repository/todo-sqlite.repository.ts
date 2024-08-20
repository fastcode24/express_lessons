import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import fs from 'fs';
import { Task, TodoRepository } from "../../../libs/types";

export class TodoSQLiteRepository implements TodoRepository {
  private db!: Database;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    const dbPath = './tasks.db';
    const dbExists = fs.existsSync(dbPath);

    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    if (!dbExists) {
      await this.db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          duration INTEGER
        )
      `);
    }
  }

  public async find(): Promise<Task[]> {
    return this.db.all<Task[]>('SELECT * FROM tasks');
  }

  public async save(newTask: Task): Promise<Task> {
    const result = await this.db.run(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [newTask.title, newTask.description]
    );

    return {
      id: result.lastID,
      title: newTask.title,
      description: newTask.description
    };
  }

  public async delete(taskId: number): Promise<boolean> {
    const result = await this.db.run('DELETE FROM tasks WHERE id = ?', taskId);
    return (result.changes ?? 0) > 0;
  }
}
