(function (blocks, element, editor, components) {
    const { registerBlockType } = blocks;
    const el = element.createElement;
    const { RichText } = editor;

    registerBlockType('ginkgo/branch-block', {
        title: 'Branch Column',
        icon: 'columns',
        category: 'layout',
        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: 'div'
            }
        },
        edit: function (props) {
            return el(
                'div',
                { style: { borderLeft: '2px solid #ccc', paddingLeft: '10px' } },
                el(RichText, {
                    tagName: 'div',
                    value: props.attributes.content,
                    onChange: function (newContent) {
                        props.setAttributes({ content: newContent });
                    },
                    placeholder: 'Zweig-Idee hier schreiben...'
                })
            );
        },
        save: function (props) {
            return el('div', null, props.attributes.content);
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.editor, window.wp.components);
