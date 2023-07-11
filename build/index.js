"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importDefault(require("./test"));
const State = {
    first: oneBitwise(0),
    second: oneBitwise(1),
    third: oneBitwise(2),
    fourth: oneBitwise(3),
};
function oneBitwise(num) {
    return 1 << num;
}
function check() {
    for (const localState in State) {
        if (aboba & State[localState]) {
            console.log(`${localState} is in ${aboba}`);
        }
    }
    console.log();
}
let aboba = State.first | State.third;
check();
aboba = aboba | State.second;
check();
aboba = aboba & ~State.third;
check();
console.log(test_1.default);
//# sourceMappingURL=index.js.map