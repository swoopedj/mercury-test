'use strict';

var mercury = require('../../main.js');
var h = mercury.h;
var textarea = require('./textarea');
var mdRender = require('./mdRender');

sideBySideMdEditor.render = sideBySideMdEditorRender;

module.exports = sideBySideMdEditor;

function sideBySideMdEditor(options) {
    // console.log('Made it to Editor file, options: ', options);
    options = options || {};

    var editor = textarea({
        value: options.boldValue || options.value,
        placeholder: options.placeholder,
        title: options.title,
        boldValue: options.boldValue
    });
    var renderer = mdRender({ value: options.boldValue || options.value });
    var state = mercury.struct({
        editor: editor,
        renderer: renderer
    });

    editor.value(renderer.value.set);

    return state;
}

function sideBySideMdEditorRender(state) {
    //console shows state.value to have bold properties after click
    // console.log('Renderer State: ', state);
    return h('.sideBySideMdEditor', [
        textarea.render(state.editor),
        mdRender.render(state.renderer)
    ]);
}
