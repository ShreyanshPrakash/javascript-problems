const DEFAULTS = {
  CONCURRENT_TASK_COUNT: 2,
};

class TaskScheduler {
  #activeTasksCount;
  #pendingTaskQueue;
  #trackCounter;
  #tasksResult;

  constructor({
    concurrentTasks = DEFAULTS.CONCURRENT_TASK_COUNT,
    onResult = () => {},
  }) {
    this.concurrentTasks = concurrentTasks;

    this.#activeTasksCount = 0;
    this.#pendingTaskQueue = [];

    this.#trackCounter = -1;
    this.#tasksResult = [];
  }

  addTask(task) {
    this.#trackCounter++;
    if (this.#activeTasksCount < this.concurrentTasks) {
      this.#runTask(task, this.#trackCounter);
    } else {
      this.#pendingTaskQueue.push({ id: this.#trackCounter, task });
    }
  }

  /*
        Utility Methods
    */

  #getNextTask() {
    if (
      this.#pendingTaskQueue.length &&
      this.#activeTasksCount < this.concurrentTasks
    ) {
      const taskItem = this.#pendingTaskQueue.shift();
      return taskItem;
    }

    return null;
  }

  async #runTask(task, index) {
    this.#activeTasksCount++;

    try {
      const result = await task();
      // call a callback whenever we have result or error
      this.#tasksResult[index] = result;
    } catch (error) {
      this.#tasksResult[index] = error;
    } finally {
      this.#activeTasksCount--;
    }

    onResult(this.#tasksResult);

    const nextTaskItem = this.#getNextTask();
    if (nextTaskItem) {
      this.#runTask(nextTaskItem.task, nextTaskItem.id);
    }
  }
}

class Task {
  constructor() {}

  getTask(delay) {
    return () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Task delay : ", delay);
          resolve("Task delay : " + delay);
        }, delay);
      });
    };
  }
}

/*
    Runner Code
*/

const CONCURRENT_TASK_COUNT = 2;

const onResult = (params) => {
  console.log(params);
};

const scheduler = new TaskScheduler({
  concurrentTasks: CONCURRENT_TASK_COUNT,
  onResult,
});

const task = new Task();

scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));

scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
scheduler.addTask(task.getTask(2 * 1000));
