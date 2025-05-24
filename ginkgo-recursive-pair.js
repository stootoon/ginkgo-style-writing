(function (blocks, element, blockEditor) {
    const { registerBlockType } = blocks;
    const { createElement: el, Fragment } = element;
    const { InnerBlocks } = blockEditor;

    // Parent container: two-part layout
    registerBlockType('ginkgo/branch-pair', {
        title: 'Branch Pair',
        icon: 'columns',
        category: 'layout',
        supports: {
            html: false
        },
        edit: () => el('div', { className: 'ginkgo-pair-block' }, [
            el('div', { className: 'ginkgo-main' }, el(InnerBlocks, { allowedBlocks: ['ginkgo/branch-main'], template: [['ginkgo/branch-main']] })),
            el('div', { className: 'ginkgo-branch' }, el(InnerBlocks, { allowedBlocks: ['ginkgo/branch-side'], template: [['ginkgo/branch-side']] }))
        ]),
        save: () => el('div', { className: 'ginkgo-pair-block' }, [
            el('div', { className: 'ginkgo-main' }, el(InnerBlocks.Content)),
            el('div', { className: 'ginkgo-branch' }, el(InnerBlocks.Content))
        ])
    });

    // Main column block
    registerBlockType('ginkgo/branch-main', {
        title: 'Main Line',
        icon: 'editor-paragraph',
        category: 'layout',
        parent: ['ginkgo/branch-pair'],
        supports: {
            html: false
        },
        edit: () => el('div', { className: 'ginkgo-main-inner' },
            el(InnerBlocks, { allowedBlocks: ['core/paragraph', 'core/heading', 'ginkgo/branch-pair'], templateLock: false })
        ),
        save: () => el('div', { className: 'ginkgo-main-inner' },
            el(InnerBlocks.Content)
        )
    });

    // Side/branch column block
    registerBlockType('ginkgo/branch-side', {
        title: 'Branch Line',
        icon: 'editor-indent',
        category: 'layout',
        parent: ['ginkgo/branch-pair'],
        supports: {
            html: false
        },
        edit: () => el('div', { className: 'ginkgo-branch-inner' },
            el(InnerBlocks, { allowedBlocks: ['core/paragraph', 'core/heading', 'ginkgo/branch-pair'], templateLock: false })
        ),
        save: () => el('div', { className: 'ginkgo-branch-inner' },
            el(InnerBlocks.Content)
        )
    });

})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
