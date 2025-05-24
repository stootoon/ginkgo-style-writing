(function (blocks, element, editor, components, data) {
    const { registerBlockType } = blocks;
    const el = element.createElement;
    const { RichText } = editor;
    const { useSelect } = data;

    registerBlockType('ginkgo/branch-block', {
        title: 'Branch Column',
        icon: 'columns',
        category: 'layout',
        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: 'div'
            },
            parentId: {
                type: 'string',
                default: ''
            }
        },
        edit: (props) => {
            const { attributes, setAttributes, clientId } = props;
            const siblingBlocks = useSelect(select => select('core/block-editor').getBlocks(), []);
            const index = siblingBlocks.findIndex(block => block.clientId === clientId);
            if (!attributes.parentId && index > 0) {
                const parentBlock = siblingBlocks[index - 1];
                if (parentBlock) {
                    setAttributes({ parentId: parentBlock.clientId });
                }
            }

            return el(
                'div',
                { style: { borderLeft: '4px solid #aaa', paddingLeft: '1em', backgroundColor: '#f9f9f9' } },
                el('small', { style: { color: '#777' } },
                    `↳ Verzweigt von Block ${attributes.parentId.slice(0, 8)}…`
                ),
                el(RichText, {
                    tagName: 'div',
                    value: attributes.content,
                    onChange: (newContent) => setAttributes({ content: newContent }),
                    placeholder: 'Zweig-Idee hier schreiben…'
                })
            );
        },
        save: (props) => {
            return el('div', null, props.attributes.content);
        }
    });
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.editor,
    window.wp.components,
    window.wp.data
);
