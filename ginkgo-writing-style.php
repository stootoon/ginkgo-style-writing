<?php
/*
Plugin Name: Ginkgo Style Writing
Description: Ermöglicht verzweigtes Schreiben mit parallelen Spalten, inspiriert von Ginkgo.
Version: 0.3
Author: ChatGPT (Sina Tootoonian)
*/

// Register custom post type for branches
function ginkgo_register_branch_post_type() {
    register_post_type('ginkgo_branch', array(
        'labels' => array(
            'name' => __('Branches'),
            'singular_name' => __('Branch')
        ),
        'public' => false,
        'show_ui' => true,
        'supports' => array('title', 'editor', 'revisions'),
        'capability_type' => 'post',
    ));
}
add_action('init', 'ginkgo_register_branch_post_type');

// Enqueue block editor assets
function ginkgo_enqueue_editor_assets() {
    wp_enqueue_script(
        'ginkgo-editor',
        plugin_dir_url(__FILE__) . 'ginkgo-editor.js',
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
        null,
        true
    );
    wp_enqueue_style(
        'ginkgo-editor-style',
        plugin_dir_url(__FILE__) . 'ginkgo-editor.css'
    );
}
add_action('enqueue_block_editor_assets', 'ginkgo_enqueue_editor_assets');

// Extend block attributes for optional branch metadata
function ginkgo_register_block_variants() {
    wp_add_inline_script('ginkgo-editor', 'window.ginkgoBranchSupport = true;', 'before');
}
add_action('init', 'ginkgo_register_block_variants');

// Register BranchPair block
add_action('init', function () {
    if (!function_exists('register_block_type')) return;

    wp_register_script(
        'ginkgo-pair-block',
        plugin_dir_url(__FILE__) . 'ginkgo-pair-block.js',
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
        null,
        true
    );

    register_block_type('ginkgo/branch-pair', array(
        'editor_script' => 'ginkgo-pair-block',
        'attributes' => array(
            'main' => array(
                'type' => 'string',
                'default' => ''
            ),
            'branch' => array(
                'type' => 'string',
                'default' => ''
            )
        ),
        'render_callback' => function ($attrs) {
            return '<div class="ginkgo-pair"><div class="main-col">' .
                wpautop($attrs['main']) . '</div><div class="branch-col">' .
                wpautop($attrs['branch']) . '</div></div>';
        }
    ));
});
