'use strict';

var mercury = require('../main.js');
var h = mercury.h;
var inlineMdEditor = require('./component/inlineMdEditor');
var sideBySideMdEditor = require('./component/sideBySideMdEditor');

app.render = appRender;

module.exports = app;

function app() {
    var state = mercury.struct({
        inlineEditor: inlineMdEditor({
            placeholder: 'Enter some markdown...'
        }),
        sideBySideEditor: sideBySideMdEditor({
            placeholder: 'Enter some markdown...',
            value: [
                '#Hello World',
                '',
                '* sample',
                '* bullet',
                '* points'
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
        h('.content', [
            h('h2', 'Side-by-side Markdown Editor'),
            h('p', 'Enter some markdown in the left pane and see it rendered ' +
                'in the pane on the right.'),
            sideBySideMdEditor.render(state.sideBySideEditor)
            // h('h2', 'Inline Markdown Editor'),
            // h('p', 'Enter some markdown and click outside of the textarea to ' +
            //     'see the parsed result. Click the output to edit again.'),
            // inlineMdEditor.render(state.inlineEditor)
        ])
    ]);
}
