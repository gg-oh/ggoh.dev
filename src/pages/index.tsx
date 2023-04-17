import * as React from "react"
import { Link, PageProps, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    nodes: {
      excerpt: string
      fields: {
        slug: string
      }
      frontmatter: {
        date: string
        title: string
        description: string
        category: string
        tags: string[]
      }
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<DataProps>) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>아직 작성된 게시글이 없습니다.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const link = `posts${post.fields.slug}`

          return (
            <li key={post.fields.slug} className="mb-0">
              <div className="mt-5 space-y-16 border-t border-gray-200 pt-5">
                <Link to={link} itemProp="url">
                  <article
                    className="blog-post flex flex-col items-start justify-between py-5 px-6 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5 hover:bg-slate-50"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime="2020-03-16" className="text-gray-500">
                        {post.frontmatter.date}
                      </time>
                      {post.frontmatter.category && (
                        <a
                          href="#"
                          className="relative z-10 rounded-full ring-1 ring-indigo-500 px-3 py-1 font-medium text-indigo-500"
                        >
                          {post.frontmatter.category}
                        </a>
                      )}
                    </div>
                    <div className="group relative">
                      <h3 className="post-title mt-3 text-2xl font-semibold leading-6 text-gray-700">
                        <span className="absolute inset-0"></span>
                        {title}
                      </h3>
                      <p
                        className="mt-5 mb-5 line-clamp-3 text-sm leading-6 text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      ></p>
                      <div className="tags">
                        {post.frontmatter.tags
                          ? post.frontmatter.tags.map(tag => (
                              <span className="tag-cloud inline-block shadow-md rounded-lg px-2 py-1 text-xs text-gray-700 mr-2">
                                {tag}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YY.MM.DD", locale: "ko-KR")
          title
          description
          category
          tags
        }
      }
    }
  }
`
