(function (blocks, element, blockEditor) {
    const { registerBlockType } = blocks;
    const { createElement: el } = element;
    const { InnerBlocks } = blockEditor;

    // Parent block: branch-pair
    registerBlockType('ginkgo/branch-pair', {
        title: 'Branch Pair',
        icon: 'columns',
        category: 'layout',
        supports: { html: false },
        edit: () =>
            el('div', { className: 'ginkgo-pair-block' },
                el(InnerBlocks, {
                    template: [
                        ['ginkgo/branch-main'],
                        ['ginkgo/branch-side']
                    ],
                    templateLock: 'all'
                })
            ),
        save: () =>
            el('div', { className: 'ginkgo-pair-block' },
                el(InnerBlocks.Content)
            )
    });

    // Child block: branch-main
    registerBlockType('ginkgo/branch-main', {
        title: 'Main Line',
        icon: 'editor-paragraph',
        category: 'layout',
        parent: ['ginkgo/branch-pair'],
        supports: { html: false },
        edit: () =>
            el('div', { className: 'ginkgo-main' },
                el(InnerBlocks, {
                    allowedBlocks: ['core/paragraph', 'core/heading', 'ginkgo/branch-pair'],
                    templateLock: false
                })
            ),
        save: () =>
            el('div', { className: 'ginkgo-main' },
                el(InnerBlocks.Content)
            )
    });

    // Child block: branch-side
    registerBlockType('ginkgo/branch-side', {
        title: 'Branch Line',
        icon: 'editor-indent',
        category: 'layout',
        parent: ['ginkgo/branch-pair'],
        supports: { html: false },
        edit: () =>
            el('div', { className: 'ginkgo-branch' },
                el(InnerBlocks, {
                    allowedBlocks: ['core/paragraph', 'core/heading', 'ginkgo/branch-pair'],
                    templateLock: false
                })
            ),
        save: () =>
            el('div', { className: 'ginkgo-branch' },
                el(InnerBlocks.Content)
            )
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
