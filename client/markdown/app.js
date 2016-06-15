'use strict';

var mercury = require('../main.js');
var $ = require('jquery');
var h = mercury.h;
var extend = require('xtend');
// var fileSaveInput = require('./component/fileSaveInput');
var sideBySideMdEditor = require('./component/sideBySideMdEditor');
//
var textArea = require('./component/textarea')

app.render = appRender;

module.exports = app;

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
    });

    return state;
}


function appRender(state) {
    console.log('appRender, state: ', state)
    var events = state.sideBySideEditor.editor.events;
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
            h('form', [
                h('input.document-name', {
                    placeholder: 'File_name.md'
                // [fileSaveInput.render(state.fileSaveInput)]
                }),
                h('input.download', {
                    type: 'image',
                    src: './public/Download-512.png'
                })
            ])
        ]),
        h('.content', [
            sideBySideMdEditor.render(state.sideBySideEditor)
        ]),
        h('input', {
            type: 'button',
            value: "Bold",
            'ev-click': function embolden(){
                // console.log('STATE: ', state)

                var boldValue = state.sideBySideEditor.editor.boldValue;
                // state.sideBySideEditor.editor.value.set(state.sideBySideEditor.editor.boldValue)
                // state.value.set(state.boldValue);
                // if(state.sideBySideEditor.editor.boldValue){
                //     var temp = state.sideBySideEditor.editor.value
                //     state.sideBySideEditor.editor.value = state.sideBySideEditor.editor.boldValue;
                //     state.sideBySideEditor.renderer.value = state.sideBySideEditor.editor.boldValue;
                //     // sideBySideMdEditor.render(state.sideBySideEditor)
                //     // state.sideBySideEditor.editor.value.set(state.sideBySideEditor.editor.boldValue)
                //     var newState = extend(state.sideBySideEditor, {value: state.sideBySideEditor.editor.boldValue})
                //     sideBySideMdEditor(newState)
                //     sideBySideMdEditor.render(newState)
                // }
                // else if(!state.sideBySideEditor.editor.boldValue && temp){
                //     state.sideBySideEditor.editor.value = temp;
                //     temp = null;
                // }
                events.click(boldValue)
                document.getElementById('#expanding').focus()
                // state.sideBySideEditor.editor.boldValue = null;

            }
        })
    ]);
}
