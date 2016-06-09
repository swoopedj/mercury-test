'use strict';

var mercury = require('../main.js');
var h = mercury.h;
// var inlineMdEditor = require('./component/inlineMdEditor');
var sideBySideMdEditor = require('./component/sideBySideMdEditor');

app.render = appRender;

module.exports = app;

function app() {
    var state = mercury.struct({
        // inlineEditor: inlineMdEditor({
        //     placeholder: 'Enter some markdown...'
        // }),
        sideBySideEditor: sideBySideMdEditor({
            placeholder: 'Enter some markdown...',
            value: [
                '<h2>Hello World</h2>',
                '',
                '* markdown',
                '* goes',
                '* here'
            ].join('\n')
        })
    });

    return state;
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
        h('div.subtitle', [h('h2.subtitle-text', 'Enter your markdown:')]),
        h('.content', [
            sideBySideMdEditor.render(state.sideBySideEditor)
            // h('h2', 'Inline Markdown Editor'),
            // h('p', 'Enter some markdown and click outside of the textarea to ' +
            //     'see the parsed result. Click the output to edit again.'),
            // inlineMdEditor.render(state.inlineEditor)
        ])
    ]);
}
