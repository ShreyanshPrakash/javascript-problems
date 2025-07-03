class TaskManager2 {
  #ongoingTaskCount;
  #pendingJobQueue;

  constructor(capacity) {
    this.capacity = capacity;
    this.#ongoingTaskCount = 0;

    this.#pendingJobQueue = [];
  }

  addTask(task, ...args) {
    return new Promise((resolve, reject) => {
      async function taskRunner(...args) {
        this.#ongoingTaskCount++;
        try {
          const result = await task.call(this, ...args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.#ongoingTaskCount--;
          this.#runNextTask();
        }
      }

      if (this.#canRunTask()) {
        taskRunner.call(this, ...args);
      } else {
        this.#pendingJobQueue.push(taskRunner.bind(this, ...args));
      }
    });
  }

  #canRunTask() {
    return this.#ongoingTaskCount < this.capacity;
  }

  #getNextTask() {
    if (this.pendingTaskQueue.length) {
      return this.pendingTaskQueue.shift();
    }
    return null;
  }

  #runNextTask() {
    const nextTask = this.#getNextTask();
    if (nextTask) {
      nextTask.call(this);
    }
  }
}
