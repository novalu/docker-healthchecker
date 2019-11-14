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
Container.STATUS_HEALTHY = 1;
Container.STATUS_STARTING = 2;
Container.STATUS_UNHEALTHY = 3;
Container.STATUS_DOWN = 4;
//# sourceMappingURL=Container.js.map