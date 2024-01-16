/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 'latest',
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
            presets: ['@babel/preset-env']
        }
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier/skip-formatting', 'prettier', 'plugin:prettier/recommended', 'plugin:vue/vue3-recommended'],
    plugins: ['prettier'],
    rules: {
        'nuxt/no-cjs-in-config': 'off',
        'linebreak-style': 'off',
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'no-sparse-arrays': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4],
        'vue/max-attributes-per-line': 0,
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off',
        'vue/no-v-html': 'off',
        'vue/attributes-order': 'off'
    }
}

