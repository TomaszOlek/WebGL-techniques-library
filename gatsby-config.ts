import dotenv from 'dotenv'
import fs from 'fs'
import { GatsbyConfig } from 'gatsby'
import netlifyAdapter from 'gatsby-adapter-netlify'
import path from 'path'

const env = process.env

dotenv.config({
  path: `.env.${env.GATSBY_ACTIVE_ENV || env.NODE_ENV || 'development'}`,
})

const I18N_NAMESPACES: string[] = []
fs.readdirSync('./src/translation/locales/pl').forEach((file: string) => {
  I18N_NAMESPACES.push(file.replace(/\.[^.]*$/, ''))
})

const GATSBY_REQUIRED_RULES: string = path.join(
  process.cwd(),
  'node_modules',
  'gatsby',
  'dist',
  'utils',
  'eslint-rules'
)

const SITE_URL =
  env.NODE_ENV === 'development'
    ? `http://localhost:8000`
    : 'https://www.example.com'

const OMIT_PATHS = ['/404', '/preview']

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby Starter Typescipt Styled-Components i18n`,
    description: `Starter Description`,
    author: `inDigital`,
    siteUrl: SITE_URL,
  },

  graphqlTypegen: true, // Generates Typescript types for graphql queries
  adapter: netlifyAdapter({
    excludeDatastoreFromEngineFunction: false,
    imageCDN: false,
  }),
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-no-sourcemaps',

    // i18n translations
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `pl`,
        locales: `pl en`,
        configPath: path.resolve(`${__dirname}/src/translation/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./src/translation/locales`,
        i18nextOptions: {
          supportedLngs: ['pl', 'en'],
          ns: I18N_NAMESPACES,
        },
      },
    },

    // Assets
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        dimensions: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 95,
          breakpoints: [500, 750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },

    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },

    // Config
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#663399`,
        minimum: 0.01,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/icons/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        rulePaths: [GATSBY_REQUIRED_RULES],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', '.cache', 'public'],
        stages: ['develop'],
        emitWarning: true,
        failOnError: true, // If we just want warnings instead of linting errors, set to false
      },
    },

    // CMS
    // {
    //   resolve: `gatsby-source-wordpress`,
    //   options: {
    //     url: `${env.WORDPRESS_URL}/graphql`,
    //     html: {
    //       useGatsbyImage: true,
    //       generateWebpImages: true,
    //     },
    //     schema: {
    //       perPage: 9,
    //       requestConcurrency: 3,
    //       previewRequestConcurrency: 2,
    //     },
    //     type: {
    //       MediaItem: {
    //         excludeFieldNames: [
    //           `dateGmt`,
    //           `date`,
    //           `parent`,
    //           `ancestors`,
    //           `comments`,
    //           `author`,
    //           `authorDatabaseId`,
    //           `authorId`,
    //           `commentCount`,
    //           `commentStatus`,
    //           `enclosure`,
    //           `desiredSlug`,
    //           `modified`,
    //           `modifiedGmt`,
    //           `parentId`,
    //           `parentDatabaseId`,
    //         ],
    //         localFile: {
    //           requestConcurrency: 5,
    //         },
    //       },
    //     },
    //     develop: {
    //       nodeUpdateInterval: 10000,
    //     },
    //   },
    // },

    // SEO
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        sitemap: `${SITE_URL}/sitemap-0.xml`,
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: OMIT_PATHS,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
        query: `
        {
          allSitePage {
            nodes {
              path
              component
              context: pageContext
            }
          }
        }
      `,
        resolveSiteUrl: () => SITE_URL,
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }: {
          allSitePage: {
            nodes: {
              path: string
              component: string
              context: any
            }[]
          }
        }) => {
          return allPages
            .filter(
              (page) =>
                !OMIT_PATHS.includes(page.path) &&
                !page.path.startsWith('/en') &&
                !page.context.isFlatPage
            )
            .map((el) => {
              const isStatic = el.component.includes('pages')
              let priority = 0.64
              if (el.path === '/') priority = 1
              if (isStatic) priority = 0.8
              return {
                ...el,
                priority: priority,
              }
            })
            .sort((a, b) => b.priority - a.priority)
        },
        serialize: ({ path, priority }: { path: string; priority: number }) => {
          return {
            url: SITE_URL + path,
            priority,
          }
        },
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

export default config
