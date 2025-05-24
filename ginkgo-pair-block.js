(function (blocks, element, blockEditor) {
    const { registerBlockType } = blocks;
    const { createElement: el } = element;
    const { InnerBlocks } = blockEditor;

    registerBlockType('ginkgo/branch-pair', {
        title: 'Branch Pair',
        icon: 'columns',
        category: 'layout',
        supports: {
            html: false
        },
        edit: () => {
            return el(
                'div',
                { className: 'ginkgo-pair-block' },
                el('div', { className: 'ginkgo-main' }, el(InnerBlocks)),
                el('div', { className: 'ginkgo-branch' }, el(InnerBlocks))
            );
        },
        save: () => {
            return el(
                'div',
                { className: 'ginkgo-pair-block' },
                el('div', { className: 'ginkgo-main' }, el(InnerBlocks.Content)),
                el('div', { className: 'ginkgo-branch' }, el(InnerBlocks.Content))
            );
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
