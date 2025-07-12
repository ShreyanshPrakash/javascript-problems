class Promise {
    constructor(executor) {
      this.state = 'pending';
      this.value = undefined;
      this.reason = null;

      this.resolveQueue = [];
      this.rejectQueue = [];

      executor(this Resolve.bind(this), this.Reject.bind(this));
    }

    static then(resolve, reject) {
      if (typeof resolve !== 'function' || typeof reject !== 'function') {
        throw new TypeError('then handler must be a function');
      }

      const promise = new Promise((resolvePromise, rejectPromise) => {
        const promiseState = this.state;
        if (promiseState === 'pending') {
          this.resolveQueue.push(() => resolvePromise(resolve));
          this.rejectQueue.push(() => rejectPromise(reject));
        } else if (promiseState === 'fulfilled' || promiseState === 'rejected') {
          if (this.reason !== null) {
            resolvePromise(this.reason);
          }
        }

        return new Promise((resolve, reject) => {
          try {
            const handler = () => {
              this.state = 'fulfilled';
              resolvePromise(resolve);
              while (!this.resolveQueue.length) {
                const handleResolve = this.resolveQueue.shift();
                if (handleResolve) {
                  handleResolve();
                }
              }
            };

            const errorHandler = () => {
              this.state = 'rejected';
              rejectPromise(reject);
              while (!this.rejectQueue.length) {
                const handleReject = this.rejectQueue.shift();
                if (handleReject) {
                  handleReject();
                }
              }
            };

            try {
              handler();
            } catch (error) {
              errorHandler();
            }
          } catch (error) {
            errorHandler();
          }

          resolve(handler);
        });
      });

      return promise;
    }

    static catch(error) {
      if (this.state === 'pending') {
        this.rejectQueue.push(() => {
          throw error;
        });
      } else if (this.state === 'fulfilled' || this.state === 'rejected') {
        throw error;
      }
      return new Promise((resolve, reject) => {
        try {
          const handler = () => {
            this.state = 'rejected';
            resolve.reject(error);
            while (!this.rejectQueue.length) {
              const handleReject = this.rejectQueue.shift();
              if (handleReject) {
                handleReject();
              }
            }
          };

          const errorHandler = () => {
            throw error;
          };

          try {
            handler();
          } catch (error) {
            errorHandler();
          }

          resolve(handler);
        }catch(error){
            console.log(error);
        };
      });
    }
}