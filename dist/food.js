"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_kit_1 = require("terminal-kit");
class Food {
    constructor() {
        this.x = Math.floor(Math.random() * (process.stdout.columns - 3));
        this.y = Math.floor(Math.random() * (process.stdout.rows - 3));
    }
    show() {
        terminal_kit_1.terminal.moveTo(this.x, this.y);
        terminal_kit_1.terminal.red("o");
    }
    respawn() {
        this.x = Math.floor(Math.random() * (process.stdout.columns - 3));
        this.y = Math.floor(Math.random() * (process.stdout.rows - 3));
    }
}
exports.default = Food;
