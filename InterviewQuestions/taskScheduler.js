class Taskscheduler {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.runningTasks = 0;
    this.__waitingQueue = [];
  }

  getNextTask() {
    if (
      this.runningTasks < this.concurrency &&
      this.__waitingQueue.length > 0
    ) {
      const nextTask = this.__waitingQueue.shift();
      return { done: false, task: nextTask };
    }
    return { done: true, task: () => {} };
  }

  addTask(task) {
    return new Promise((resolve, reject) => {
      async function __taskRunner() {
        this.runningTasks += 1;
        try {
          const result = await task();
          console.log(result);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.runningTasks -= 1;
          const nextTask = this.getNextTask();
          if (!nextTask.done) {
            nextTask.task();
          }
        }
      }

      if (this.runningTasks < this.concurrency) {
        __taskRunner.call(this);
      } else {
        this.__waitingQueue.push(__taskRunner.bind(this));
      }
    });
  }
}

class Task {
  constructor() {}

  getTask(delay) {
    return () => new Promise((res) => setTimeout(() => res("Task"), delay));
  }
}

const scheduler = new Taskscheduler(2);
const task = new Task();

scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
