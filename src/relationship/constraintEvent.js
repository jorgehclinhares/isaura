const util         = require("util"),
      EventEmitter = require("events").EventEmitter;

function constraintEvent () {
  EventEmitter.call(this);
}

util.inherits(constraintEvent, EventEmitter);

module.exports = constraintEvent;