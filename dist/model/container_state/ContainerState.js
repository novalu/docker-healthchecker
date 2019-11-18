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
ContainerState.RUNNING_STARTING = new ContainerState(1, "starting", "#000000"); // container is running and health is: unhealthy
ContainerState.RUNNING_HEALTHY = new ContainerState(2, "healthy", "#2EB886"); // container is running and health is: healthy
ContainerState.RUNNING_UNHEALTHY = new ContainerState(3, "unhealthy", "#FF4454"); // container is running and health is: starting
ContainerState.DOWN = new ContainerState(4, "down", "#FF4454"); // container is not running
ContainerState.RUNNING_UNKNOWN = new ContainerState(5, "unknown", "#AAAAAA"); // container is running and health state not found
//# sourceMappingURL=ContainerState.js.map