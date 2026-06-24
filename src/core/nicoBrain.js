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
        this.state.emotion = "celebrating";
        this.state.energy = Math.min(100, this.state.energy + 15);
        break;

      case "NAVIGATE":
        this.state.emotion = "thinking";
        break;

      case "GREET":
        this.state.emotion = "greeting";
        this.state.energy = Math.min(100, this.state.energy + 5);
        break;

      case "THINK":
        this.state.emotion = "thinking";
        break;

      case "LISTEN":
        this.state.emotion = "listening";
        break;

      case "EXPLAIN":
        this.state.emotion = "explaining";
        break;

      case "MOTIVATE":
        this.state.emotion = "motivating";
        this.state.energy = Math.min(100, this.state.energy + 5);
        break;

      case "NOTIFY":
        this.state.emotion = "notifying";
        break;

      case "REST":
      case "INACTIVITY":
        this.state.emotion = "resting";
        break;

      case "ACTIVE":
      case "IDLE":
      default:
        this.state.emotion = "idle";
        break;
    }

    return { ...this.state };
  }
}

export const nicoBrain = new NicoBrain();
