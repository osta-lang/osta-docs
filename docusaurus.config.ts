import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as prismTheme from "./src/theme/prism-theme";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'Osta-Lang Documentation',
    tagline: 'Safe and fast low-level programming language',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://docs.osta-lang.dev',
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'osta-lang',
    projectName: 'osta-docs',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl:
                        'https://github.com/osta-lang/osta-docs/tree/main/docs/',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    editUrl:
                        'https://github.com/osta-lang/osta-docs/tree/main/blog/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'Osta-Docs',
            // logo: {
            //     alt: 'Osta-Lang Logo',
            //     src: 'img/logo.svg',
            // },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'guides',
                    position: 'left',
                    label: 'Guides',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'reference',
                    position: 'left',
                    label: 'Reference',
                },
                {to: '/blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/osta-lang/osta-docs',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        prism: {
            theme: prismTheme.theme,
            darkTheme: prismTheme.dark,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
