/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `ggoh.dev`,
    author: {
      name: `오경근`,
      summary: `잡다하게 글을 씁니다.`,
    },
    description: `오경근 개발 블로그 입니다.`,
    siteUrl: `https://ggoh.dev`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: encodeURI(
                    site.siteMetadata.siteUrl + `/posts` + node.fields.slug
                  ),
                  guid: site.siteMetadata.siteUrl + `/posts` + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "ggoh.dev RSS Feed",
            match: `/posts/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ggoh.dev`,
        short_name: `ggoh.dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-GZNE79NWD4", // Google Analytics / GA
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://ggoh.dev`,
        sitemap: `https://ggoh.dev/sitemap-index.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    `gatsby-plugin-sitemap`,
  ],
}
