'use strict';

var mercury = require('../../main.js');
var h = mercury.h;
var doMutableFocus = require('../focus-hook.js');
var update = {
    // this needs to be input rather than change so that the pre expands as text
    // is entered into the textarea
    input: function input(state, e) {
        state.value.set(e.target.value);
    },
    change: function change(state, e) {
        // trim the content on a change event
        state.value.set(e.target.value.trim());
    }
};

textarea.render = textareaRender;
textarea.update = update;
textarea.input = input;

module.exports = textarea;

function textarea(options) {
    options = options || {};

    var events = input();
    var state = mercury.struct({
        events: events,
        value: mercury.value(options.value || ''),
        placeholder: mercury.value(options.placeholder || ''),
        title: mercury.value(options.title || ''),
        shouldFocus: options.shouldFocus
    });

    events.input(update.input.bind(null, state));
    events.change(update.change.bind(null, state));

    return state;
}

function input() {
    return mercury.input([ 'blur', 'change', 'input' ]);
}

function textareaRender(state) {
    var events = state.events;

    return h('.textarea', [
        h('textarea#expanding', {
            'onblur': function(){
                 var textComponent = document.getElementById('expanding');

                  var selectedText;
                  // IE version
                  if (document.selection != undefined)
                  {
                    textComponent.focus();
                    var sel = document.selection.createRange();
                    state.selectedText = mercury.value(sel.text);
                    

                  }
                  // Mozilla version
                  else if (textComponent.selectionStart != undefined)
                  {
                    var startPos = textComponent.selectionStart;
                    var endPos = textComponent.selectionEnd;
                    state.selectedText = 
                    mercury.value(textComponent.value.substring(startPos, endPos))

                  }
                  // console.log(state.selectedText)
                  // return state.selectedText
                    // alert("You selected: " + selectedText);

            },
            'ev-blur': mercury.event(events.blur, state.value),
            'ev-change': events.change,
            'ev-input': events.input,
            'ev-focus': state.shouldFocus ? doMutableFocus() : null,
            name: state.title,
            placeholder: state.placeholder,
            value: state.value
        }),
        h('pre', [
            h('span', state.value),
            h('br')
        ])
    ]);
}
