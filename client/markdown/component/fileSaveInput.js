'use strict';

var mercury = require('../../main.js');
var h = mercury.h;

fileSaveInput.render = fileSaveInputRender;

module.exports = fileSaveInput;

function fileSaveInput(options) {
  options = options || {}

  var state = mercury.struct({
    input: mercury.value(options.value.set)
  })


  return state; 
}

function fileSaveInputRender(state){
  return h('.fileSaveInput', state.input)
}