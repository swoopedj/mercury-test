'use strict';

var mercury = require('../main.js');
var h = mercury.h;
var fileSaveInput = require('./component/fileSaveInput');
var sideBySideMdEditor = require('./component/sideBySideMdEditor');

app.render = appRender;

module.exports = app;

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
            ].join('\n')
        }),
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
            'ev-click': function(){
                // var sel = window.getSelection()
                console.log(state.selectedText);
            }
        })
    ]);
}
