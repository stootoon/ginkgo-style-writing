<?php
/*
Plugin Name: Ginkgo Style Writing
Description: Ermöglicht verzweigtes Schreiben mit parallelen Spalten, rekursiv wie bei Ginkgo.
Version: 0.7
Author: Deine Name
*/

// Enqueue assets
function ginkgo_enqueue_editor_assets() {
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

add_action('init', function () {
    if (!function_exists('register_block_type')) return;

    register_block_type('ginkgo/branch-pair', array(
        'editor_script' => 'ginkgo-recursive-pair',
        'supports' => array('html' => false),
    ));

    register_block_type('ginkgo/branch-main', array(
        'editor_script' => 'ginkgo-recursive-pair',
        'supports' => array('html' => false),
        'parent' => ['ginkgo/branch-pair']
    ));

    register_block_type('ginkgo/branch-side', array(
        'editor_script' => 'ginkgo-recursive-pair',
        'supports' => array('html' => false),
        'parent' => ['ginkgo/branch-pair']
    ));
});
