class Scheduler {
  constructor(capacity) {
    this.capacity = capacity;
    this.runningTasksCount = 0;
    this.__waitingTaskQueue = [];
  }

  getNextTask() {
    if (
      this.runningTasksCount < this.capacity &&
      this.__waitingTaskQueue.length
    ) {
      const nextTask = this.__waitingTaskQueue.shift();
      return { done: false, task: nextTask };
    }
    return { done: true, task: () => {} };
  }

  addTask(task) {
    if (this.runningTasksCount < this.capacity) {
      this.taskRunner(task);
    } else {
      this.__waitingTaskQueue.push(task);
    }
  }

  /*
    One task runner is calling the other taskrunner and so on
    This is how it will keep on repeating
  */
  async taskRunner(task) {
    this.runningTasksCount += 1;
    const result = await task();
    this.runningTasksCount -= 1;
    const nextTask = this.getNextTask();
    if (!nextTask.done) {
      this.taskRunner(nextTask.task);
    }
  }
}

class Task {
  constructor() {}

  getTask(params) {
    return () =>
      new Promise((res) => setTimeout(() => {
        console.log("Task : ", params);
        res("Task", params);
      }, params));
  }
}

const MAX_CONCURRENT_ACTIVE_TASKS_ALLOWED = 2;
const scheduler = new Scheduler(MAX_CONCURRENT_ACTIVE_TASKS_ALLOWED);

const task = new Task();

scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));

scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
