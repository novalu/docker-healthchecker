"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor(id, image, health, startedAt) {
        this.id = id;
        this.image = image;
        this.health = health;
        this.startedAt = startedAt;
    }
}
exports.Container = Container;
Container.STATUS_RUNNING_HEALTHY = 1; // container is running and health is: healthy
Container.STATUS_RUNNING_STARTING = 2; // container is running and health is: starting
Container.STATUS_RUNNING_UNHEALTHY = 3; // container is running and health is: unhealthy
Container.STATUS_RUNNING_UNKNOWN = 4; // container is running and health state not found
Container.STATUS_DOWN = 5; // container is not running
//# sourceMappingURL=Container.js.map