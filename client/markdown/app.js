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
            // embolden: embolden;
        },
        fileSaveInput: fileSaveInput({
            value: 'Sample.md'
        })
    });

    return state;
}

function embolden(opts){
    console.log(opts);
    var opts  = opts || '';
    return '<strong>'+ opts + '</strong>'
    
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
            'ev-click': function embolden(){
                console.log('STATE: ', state)
                // console.log('REGULAR: ', state.sideBySideEditor.editor.value)
                // console.log('BOLD: ',state.sideBySideEditor.editor.boldValue)
                // state.sideBySideEditor.editor.value.set(state.sideBySideEditor.editor.boldValue)
                // state.value.set(state.boldValue);
                if(state.sideBySideEditor.editor.boldValue){
                    var temp = state.sideBySideEditor.editor.value
                    state.sideBySideEditor.editor.value = state.sideBySideEditor.editor.boldValue;
                    state.sideBySideEditor.renderer.value = state.sideBySideEditor.editor.boldValue;
                    // sideBySideMdEditor.render(state.sideBySideEditor)
                    // state.sideBySideEditor.editor.value.set(state.sideBySideEditor.editor.boldValue)
                    var newState = extend(state.sideBySideEditor, {value: state.sideBySideEditor.editor.boldValue})
                    sideBySideMdEditor(newState)
                    sideBySideMdEditor.render(newState)
                }
                else if(!state.sideBySideEditor.editor.boldValue && temp){
                    state.sideBySideEditor.editor.value = temp;
                    temp = null;
                }
                
                state.sideBySideEditor.editor.boldValue = null;

            }
        })
    ]);
}
