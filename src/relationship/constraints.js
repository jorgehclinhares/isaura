const EventEmitter = require("events");

class ConstraintEmitter extends EventEmitter {}

const constraintEmitter = new ConstraintEmitter();

constraintEmitter.on("getKey", function (done) {
  setTimeout(function() {
    done({
      invalid: false
    });
  }, 1500);
});

module.exports = constraintEmitter;