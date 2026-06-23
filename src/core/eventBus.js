class EventBus {
  constructor() {
    this.listeners = [];
  }

  emit(event) {
    this.listeners.forEach(fn => {
      try {
        fn(event);
      } catch (err) {
        console.error("Error in EventBus listener:", err);
      }
    });
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== fn);
    };
  }
}

export const eventBus = new EventBus();
