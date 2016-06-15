'use strict';

var mercury = require('../../main.js');
var h = mercury.h;
var parseMarkdown = require('marked/lib/marked');

mdRender.render = mdRenderRender;

module.exports = mdRender;

function mdRender(options) {
    // console.log('mdRender, options: ', options)
    var state = mercury.struct({
        value: mercury.value(options.value || '')
    });

    return state;
}


function mdRenderRender(state) {
    // console.log('mdRenderRender, state: ', state)
    var events = state.events;

    return h('.markdown', [
        // using a nested node due to a bug with innerHTML in vtree
        h('', { innerHTML: parseMarkdown(state.value) })
    ]);
}
