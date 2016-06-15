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
            boldValue: null,
            previousValue: null
        }),
        channels: {
            // embolden: embolden;
        },
    });

    return state;
}


function appRender(state) {
    // console.log('appRender, state: ', state)
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
                console.log('STATE: ', state)

                var boldValue = state.sideBySideEditor.editor.boldValue;
                var value = state.sideBySideEditor.editor.value;
                var preValue = state.sideBySideEditor.editor.previousValue;

                if (boldValue === value && preValue !== ''){
                    console.log('SAME! preValue assigned')
                    events.click(preValue);
                }
                else if(boldValue !== ''){
                    console.log('boldValue assigned')
                    events.click(boldValue);
                    events.cache(value);
                }
                
                // document.getElementById('#expanding').focus()
                // state.sideBySideEditor.editor.boldValue = null;

            }
        })
    ]);
}
