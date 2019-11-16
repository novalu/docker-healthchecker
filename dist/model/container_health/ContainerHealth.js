"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerHealth {
    constructor(id, text, color) {
        this.id = id;
        this.text = text;
        this.color = color;
    }
}
exports.ContainerHealth = ContainerHealth;
ContainerHealth.RUNNING_UNKNOWN = new ContainerHealth(0, "unknown", "#AAAAAA"); // container is running and health state not found
ContainerHealth.RUNNING_HEALTHY = new ContainerHealth(1, "healthy", "#2EB886"); // container is running and health is: healthy
ContainerHealth.RUNNING_UNHEALTHY = new ContainerHealth(2, "unhealthy", "#FF4454"); // container is running and health is: starting
ContainerHealth.RUNNING_STARTING = new ContainerHealth(3, "starting", "#000000"); // container is running and health is: unhealthy
ContainerHealth.DOWN = new ContainerHealth(4, "down", "#FF4454"); // container is not running
//# sourceMappingURL=ContainerHealth.js.map