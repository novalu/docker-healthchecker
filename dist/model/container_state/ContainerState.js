"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerState {
    constructor(id, text, color) {
        this.id = id;
        this.text = text;
        this.color = color;
    }
}
exports.ContainerState = ContainerState;
ContainerState.RUNNING_UNKNOWN = new ContainerState(0, "unknown", "#AAAAAA"); // container is running and health state not found
ContainerState.RUNNING_HEALTHY = new ContainerState(1, "healthy", "#2EB886"); // container is running and health is: healthy
ContainerState.RUNNING_UNHEALTHY = new ContainerState(2, "unhealthy", "#FF4454"); // container is running and health is: starting
ContainerState.RUNNING_STARTING = new ContainerState(3, "starting", "#000000"); // container is running and health is: unhealthy
ContainerState.DOWN = new ContainerState(4, "down", "#FF4454"); // container is not running
//# sourceMappingURL=ContainerState.js.map