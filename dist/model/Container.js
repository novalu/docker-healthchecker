"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor(id, image, health) {
        this.id = id;
        this.image = image;
        this.health = health;
    }
}
exports.Container = Container;
Container.STATUS_RUNNING_HEALTHY = 1;
Container.STATUS_RUNNING_STARTING = 2;
Container.STATUS_RUNNING_UNHEALTHY = 3;
Container.STATUS_DOWN = 4;
//# sourceMappingURL=Container.js.map