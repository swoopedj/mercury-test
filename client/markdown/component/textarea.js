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
        // trim the content on a change event
        state.value.set(e.target.value.trim());
    },
    bold: function bold(state, e){
        console.log('BOLD HIT')
        // state.value.set(e.target.boldValue)
    },
    embolden: function embolden(state, e){
        console.log('e, newContent: ', e)
        // state.boldValue.set(e.target.newContent)
    }
};

textarea.render = textareaRender;
textarea.update = update;
textarea.input = input;

module.exports = textarea;

function textarea(options) {
    options = options || {};
    console.log('textarea, options: ', options)

    var events = input();
    var state = mercury.struct({
        events: events,
        value: mercury.value(options.value || ''),
        placeholder: mercury.value(options.placeholder || ''),
        title: mercury.value(options.title || ''),
        shouldFocus: options.shouldFocus,
        boldValue: mercury.value(options.boldValue || '')
    });

    events.input(update.input.bind(null, state));
    events.change(update.change.bind(null, state));
    //
    events.blur(update.embolden.bind(null, state))
    events.click(update.bold.bind(null, state))

    return state;
}

function input() {
    return mercury.input([ 'blur', 'change', 'input', 'click' ]);
}

function textareaRender(state) {
    var events = state.events;
    //console shows state.value to have bold properties after click
    console.log('textareaRender, state: ', state)

    return h('.textarea', [
        h('textarea#expanding', {
            'onblur': function(){
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
                  var newContent = textContent.substring(0, startPos - 1) + '<strong>' +
                    textContent.substring(startPos, endPos) + '</strong>' + textContent.substring(endPos);
                  
                  // state.boldValue.set('some shit');
                  state.boldValue = 'some shit';

            },
            'ev-blur': events.blur,
            'ev-change': events.change,
            'ev-input': events.input,
            'ev-focus': state.shouldFocus ? doMutableFocus() : null,
            name: state.title,
            placeholder: state.placeholder,
            value: state.value,
            boldValue: state.boldValue
        }),
        h('pre', [
            h('span', state.value),
            h('br')
        ])
    ]);
}
