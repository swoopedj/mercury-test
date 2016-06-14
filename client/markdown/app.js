'use strict';

var mercury = require('../main.js');
var $ = require('jquery');
var h = mercury.h;
var extend = require('xtend');
var fileSaveInput = require('./component/fileSaveInput');
var sideBySideMdEditor = require('./component/sideBySideMdEditor');

app.render = appRender;

module.exports = app;

// $('.buttons').mousedown(function(e) {
//      e.preventDefault(); // prevents blur() to be called on an contenteditable element
// });

var textComponent = document.getElementById('expanding');

var update = {
    // this needs to be input rather than change so that the pre expands as text
    // is entered into the textarea
    embolden: function embolden(state, e) {
        console.log('E in embolden-CLICK: ', e);
        // state.value.set(e.target.value);
    }
}

function input() {
    // Only need click here? Can take it out of textarea input?
    return mercury.input([ 'click' ]);
}

function app() {
    var state = mercury.struct({
        sideBySideEditor: sideBySideMdEditor({
            placeholder: 'Enter some markdown...',
            value: [
                '<h2>Hello World</h2>',
                '',
                '* markdown',
                '* goes',
                '* here'
            ].join('\n'),
            boldValue: null
        }),
        channels: {
            embolden: embolden
        },
        fileSaveInput: fileSaveInput({
            value: 'Sample.md'
        })
    });

    return state;
}

function embolden(state){
    console.log('State in embolden: ', state);
    var events = input();
    var begin = state.sideBySideEditor.editor.boldValues.begin;
    var end = state.sideBySideEditor.editor.boldValues.end;
    var textContent = state.sideBySideEditor.editor.value;
    var newText = textContent.substring(0, begin - 1) + '<strong>' +
                    textContent.substring(begin, end) + '</strong>' + textContent.substring(end);

    events.click(update.embolden.bind(null, state));
    // if(state.sideBySideEditor.editor.boldValues){
    //     var temp = state.sideBySideEditor.editor.value
    //     // state.sideBySideEditor.editor.value = state.sideBySideEditor.editor.boldValue;
    //     // state.sideBySideEditor.renderer.value = state.sideBySideEditor.editor.boldValue;

    //     var newState = extend(state.sideBySideEditor, {value: state.sideBySideEditor.editor.boldValue})
    //     sideBySideMdEditor(newState)
    //     sideBySideMdEditor.render(newState)
    // }
    // else if(!state.sideBySideEditor.editor.boldValue && temp){
    //     state.sideBySideEditor.editor.value = temp;
    //     temp = null;
    // }

    
    

    }

function appRender(state) {
    return h('.page', {
        style: { visibility: 'visible' }
        

    }, [
        h('link', {
            rel: 'stylesheet',
            type: 'text/css',
            href: '../public/style.css'
        }),
        h('nav', [
            h('img.logo', {src: './public/cbanc-logo.jpg'}),
            h('h1.title', 'Markdown Editor')
        ]),
        h('div.subtitle', [
            h('label.input-label', 'DOCUMENT NAME'),
            h('br'),
            h('input.document-name', [
                fileSaveInput.render(state.fileSaveInput)
            ])
        ]),
        h('.content', [
            sideBySideMdEditor.render(state.sideBySideEditor)
        ]),
        h('input', {
            type: 'button',
            value: "Bold",
            'ev-click': function(){
                console.log('State in ev-click: ', state)
                embolden(state)
            }
        })
    ]);
}
