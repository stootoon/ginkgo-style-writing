<?php
/*
Plugin Name: Ginkgo Style Writing
Description: Ermöglicht verzweigtes Schreiben mit parallelen Spalten, rekursiv wie bei Ginkgo.
Version: 0.5
Author: Deine Name
*/

// Enqueue assets
function ginkgo_enqueue_editor_assets() {
    wp_enqueue_script(
        'ginkgo-editor',
        plugin_dir_url(__FILE__) . 'ginkgo-editor.js',
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
        null,
        true
    );
    wp_enqueue_script(
        'ginkgo-recursive-pair',
        plugin_dir_url(__FILE__) . 'ginkgo-recursive-pair.js',
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

// Register recursive block types
add_action('init', function () {
    if (!function_exists('register_block_type')) return;

    register_block_type('ginkgo/branch-pair', array(
        'editor_script' => 'ginkgo-recursive-pair',
        'render_callback' => null,
        'supports' => array('html' => false),
    ));

    register_block_type('ginkgo/branch-main', array(
        'title' => 'Main Line',
        'category' => 'layout',
        'parent' => ['ginkgo/branch-pair'],
        'supports' => array('html' => false),
        'editor_script' => 'ginkgo-recursive-pair'
    ));

    register_block_type('ginkgo/branch-side', array(
        'title' => 'Branch Line',
        'category' => 'layout',
        'parent' => ['ginkgo/branch-pair'],
        'supports' => array('html' => false),
        'editor_script' => 'ginkgo-recursive-pair'
    ));
});

