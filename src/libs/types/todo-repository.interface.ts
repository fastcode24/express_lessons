import { Task } from ".";

export interface TodoRepository {
  find(): Promise<Task[]>;
  save(newTask: Task): Promise<Task>;
  delete(taskId: number): Promise<boolean>;
}
