var sequence = require('sequential-task-queue');


var queue = new SequentialTaskQueue();
queue.push(() => {
    console.log("first task");
});
queue.push(() => {
    console.log("second task");
});