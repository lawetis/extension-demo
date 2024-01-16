import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import copy from "rollup-plugin-copy"

import eslint from 'vite-plugin-eslint'

import VitePluginHtmlEnv from 'vite-plugin-html-env'

const copySetting = (platform) => {
    const targetsData = [
        { src: "src/config/background.js", dest: "dist" },
        { src: "src/config/content.js", dest: "dist" },
        { src: "src/config/manifest.json", dest: "dist" }
    ]
    return targetsData
}

export default defineConfig(({ mode }) => {
    const { VITE_ENV } = loadEnv(mode, '')
    const isModeProduction = VITE_ENV === 'production'
    return {
        publicDir: 'public',
        server: {
            host: '0.0.0.0',
            port: '3200'
        },
        plugins: [
            vue(),
            VitePluginHtmlEnv({
                compiler: true
            }),
            copy({
                targets: copySetting('chrome'),
                hook: "writeBundle",
            }),
            eslint()
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
            dedupe: ["vue"]
        },
        css: {
            preprocessorOptions: {
                scss: {
                    charset: false,
                }
            }
        },
        build: {
            chunkSizeWarningLimit: 1500,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: isModeProduction,
                    drop_debugger: isModeProduction
                }
            },
            assetsInlineLimit: 0,
            rollupOptions: {
                external: [],
                input: {
                    popup: resolve(__dirname, 'popup.html')
                },
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    },
                    chunkFileNames: (chunkInfo) => {
                        const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
                        const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
                        return `js/${fileName}/[name].[hash].js`
                    }
                }
            },
            commonjsOptions: {
                exclude: [],
                include: [
                    /node_modules/
                ]
            }
        }
    }
})
