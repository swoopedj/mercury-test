'use strict';

var mercury = require('../../main.js');
var h = mercury.h;
// var $ = require('jquery');
var doMutableFocus = require('../focus-hook.js');
var update = {
    // this needs to be input rather than change so that the pre expands as text
    // is entered into the textarea
    input: function input(state, e) {
        state.value.set(e.target.value);
    },
    change: function change(state, e) {
        console.log('Change state: ', state)
        // console.log('Change e.target.boldValue: ', e.target.boldValue)
        //state.value.set(e.target.boldValue);

        // trim the content on a change event
        state.value.set(e.target.value.trim());
    }
    // bold: function embolden(state, e) {
    //     state.value.set()
    // }
};

textarea.render = textareaRender;
textarea.update = update;
textarea.input = input;

module.exports = textarea;

function textarea(options) {
    options = options || {};
    //console shows options.value to have bold properties after click
    console.log('In TEXTAREA: options.boldValues =  ', options.boldValues)

    var events = input();
    var state = mercury.struct({
        events: events,
        value: mercury.value(options.value || ''),
        placeholder: mercury.value(options.placeholder || ''),
        title: mercury.value(options.title || ''),
        shouldFocus: options.shouldFocus,
        boldValues: mercury.value(options.boldValues || '')
    });

    events.input(update.input.bind(null, state));
    events.change(update.change.bind(null, state));

    // state is a function
    // console.log("TA STATE: ", state)

    return state;
}

function input() {
    return mercury.input([ 'blur', 'change', 'input', 'click' ]);
}

function textareaRender(state) {
    var events = state.events;
    console.log('In TARENDER: ', state)

    return h('.textarea', [
        h('textarea#expanding', {
            'onblur': function(){
                // state.boldValue = null;
                 var textComponent = document.getElementById('expanding');
                 var textContent = document.getElementById('expanding').value;

                  var selectedText;
                  // IE version
                  if (document.selection != undefined)
                  {
                    textComponent.focus();
                    var sel = document.selection.createRange();
                    // state.selectedText = mercury.value(sel.text);

                  }
                  // Mozilla version
                  else if (textComponent.selectionStart != undefined)
                  {
                    var startPos = textComponent.selectionStart;
                    var endPos = textComponent.selectionEnd;

                  }
                  // var newContent = textContent.substring(0, startPos - 1) + '<strong>' + '\n' +
                  //   textContent.substring(startPos, endPos) + '</strong>' + textContent.substring(endPos);
                  
                  //This is what I want to do:
                  // state.boldValue.set(newContent);
                  //not this:
                  state.boldValues = {
                    begin: startPos,
                    end: endPos
                  }
                  // or:
                  //add click to events, but only emit on Bold button click
                  //

            },
            'ev-blur': mercury.event(events.blur, state.value),
            'ev-change': events.change,
            'ev-input': events.input,
            'ev-focus': state.shouldFocus ? doMutableFocus() : null,
            name: state.title,
            placeholder: state.placeholder,
            value: state.value,
            boldValues: state.boldValues
        }),
        h('pre', [
            h('span', state.value),
            h('br')
        ])
    ]);
}
