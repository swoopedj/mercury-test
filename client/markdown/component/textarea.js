'use strict';

var mercury = require('../../main.js');
var h = mercury.h;
var doMutableFocus = require('../focus-hook.js');
var update = {
    // this needs to be input rather than change so that the pre expands as text
    // is entered into the textarea
    input: function input(state, e) {
        state.value.set(e.target.value);
        state.previousValue.set(e.target.value);
    },
    change: function change(state, e) {
        // trim the content on a change event
        state.value.set(e.target.value.trim());
        state.previousValue.set(e.target.value.trim());
    },
    embolden: function embolden(state, e){
        state.boldValue.set(e)
    },
    bold: function bold(state, e){
        state.value.set(e)
        update.input
    },
    cache: function cache(state, e){
        state.previousValue.set(e);
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
        shouldFocus: options.shouldFocus,
        boldValue: mercury.value(options.boldValue || ''),
        previousValue: mercury.value(options.previousValue || '')
    });

    events.input(update.input.bind(null, state));
    events.change(update.change.bind(null, state));
    //
    events.blur(update.embolden.bind(null, state))
    events.click(update.bold.bind(null, state))

    events.cache(update.cache.bind(null, state))

    return state;
}

function input() {
    return mercury.input([ 'blur', 'change', 'input', 'click', 'cache' ]);
}

function textareaRender(state) {
    var events = state.events;

    return h('.textarea', [
            h('textarea#expanding', {
                'ev-blur': function(){
                     var textComponent = document.getElementById('expanding');
                     var textContent = document.getElementById('expanding').value;
                     var newContent;


                    // // IE version
                    if (document.selection != undefined){
                      textComponent.focus();
                      var sel = document.selection.createRange();
                    }
                    // // Mozilla version
                    else if (textComponent.selectionStart != undefined){
                      var startPos = textComponent.selectionStart;
                      var endPos = textComponent.selectionEnd;

                      if(startPos === endPos){
                        newContent = state.value.substring(0, startPos) + '<strong>' + 
                            '</strong>' + state.value.substring(endPos);
                      }
                      else if(state.value[startPos - 1] === '\n'){
                        newContent = state.value.substring(0, startPos - 1) + '\n <strong> \n' +
                          state.value.substring(startPos, endPos) + '</strong>' + state.value.substring(endPos);
                      }
                      //else if start is ' '

                      else {
                        newContent = state.value.substring(0, startPos) + '<strong>' +
                          state.value.substring(startPos, endPos) + '</strong>' + state.value.substring(endPos);
                      }
                    }
                      
                    events.blur(newContent)

                },
                'ev-change': events.change,
                'ev-input': events.input,
                'ev-focus': state.shouldFocus ? doMutableFocus() : null,
                name: state.title,
                placeholder: state.placeholder,
                value: state.value,
                boldValue: state.boldValue,
                previousValue: state.previousValue
            }),
            h('pre', [
                h('span', state.value),
                h('br')
            ])
    ]);
}
