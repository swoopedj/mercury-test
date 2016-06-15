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
    embolden: function embolden(state, e){
        //boldValue present on e
        console.log('embolden, e: ', e)
        // console.log('embolden, pre-state: ', state.boldValue)
        state.boldValue.set(e)
        console.log('embolden, post-state: ', state.boldValue)
    },
    bold: function bold(state, e){
        console.log('BOLD HIT, e: ', e)
        console.log('BOLD , state: ', state)
        state.value.set(state.boldValue)
    }
};

textarea.render = textareaRender;
textarea.update = update;
textarea.input = input;

module.exports = textarea;

function textarea(options) {
    options = options || {};
    // console.log('textarea, options: ', options)

    var events = input();
    var state = mercury.struct({
        events: events,
        value: mercury.value(options.value || ''),
        placeholder: mercury.value(options.placeholder || ''),
        title: mercury.value(options.title || ''),
        shouldFocus: options.shouldFocus,
        boldValue: mercury.value(options.boldValue || 'poop')
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
    // console.log('textareaRender, state: ', state)

    return h('div.textareaWrapper', [
        h('.textarea', [
            h('textarea#expanding', {
                'ev-blur': function(){
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
                      //maybe use state.value here instead of textContent
                      var newContent = state.value.substring(0, startPos - 1) + '<strong>' +
                        state.value.substring(startPos, endPos + 1) + '</strong>' + state.value.substring(endPos);
                      console.log('Blur event fired')
                      //
                      // var newContent = textContent.substring(0, startPos - 1) + '<strong>' +
                      //   textContent.substring(startPos, endPos) + '</strong>' + textContent.substring(endPos);
                      events.blur(newContent)
                      // state.boldValue.set('some shit');
                      // state.boldValue = newContent;

                },
                // 'ev-blur': events.blur,
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
            ]),
        ]),
        h('input.bold', {
        type: 'button',
        value: "Bold",
        'ev-click': events.click
        })
    ]);
}
