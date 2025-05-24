<?php
/*
Plugin Name: Ginkgo Style Writing
Description: Ermöglicht verzweigtes Schreiben mit parallelen Spalten, inspiriert von Ginkgo.
Version: 0.1
Author: Deine Name
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
add_action('enqueue_block_assets', 'ginkgo_enqueue_editor_assets');
