import { Task, TodoRepository } from "../../../libs/types";

export class TodoMemoryRepository implements TodoRepository {
  private tasks: Task[] = []
  private id: number = 1;

  public async find(): Promise<Task[]> {
    return this.tasks;
  }

  public async save(newTask: Task): Promise<Task> {
    this.tasks.push({id: this.id++, ...newTask});
    return newTask;
  }

  public async delete(taskId: number): Promise<boolean> {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return false;
    }
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}
