'use strict';

var mercury = require('../../main.js');
var h = mercury.h;

fileSaveInput.render = fileSaveInputRender;

module.exports = fileSaveInput;

function fileSaveInput(options) {
  console.log('fileSaveInput, options: ', options)
  options = options || {}

  var state = mercury.struct({
    input: mercury.value(options.value)
  })


  return state; 
}

function fileSaveInputRender(state){
  console.log('fileSaveInputRender, state: ', state)
  return h('.fileSaveInput', {
    value: state.input
  })
}