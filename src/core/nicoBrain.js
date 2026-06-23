class NicoBrain {
  constructor() {
    this.state = {
      emotion: "idle",
      energy: 100,
      attention: "center",
      lastEvent: null
    };
  }

  react(event) {
    this.state.lastEvent = event;

    switch (event.type) {
      case "CLICK":
        this.state.emotion = "happy";
        this.state.energy = Math.min(100, this.state.energy + 2);
        break;

      case "ERROR":
        this.state.emotion = "sad";
        this.state.energy = Math.max(0, this.state.energy - 10);
        break;

      case "HOVER_HEAVY":
        this.state.emotion = "surprised";
        break;

      case "CELEBRATE":
        this.state.emotion = "happy";
        this.state.energy = Math.min(100, this.state.energy + 15);
        break;

      case "NAVIGATE":
        this.state.emotion = "thinking";
        break;

      case "IDLE":
      default:
        this.state.emotion = "idle";
        break;
    }

    return { ...this.state };
  }
}

export const nicoBrain = new NicoBrain();
