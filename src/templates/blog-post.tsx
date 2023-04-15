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
  markdownRemark: {
    id: string
    excerpt: string
    html: string
    frontmatter: {
      title: string
      date: string
    }
    post: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
  }
  previous: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
  next: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
}

type HeadProps = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        description: string
      }
      excerpt: string
      post: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
        }
      }
    }
  }
}

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}: PageProps<DataProps>) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>&nbsp;</footer>
      </article>
      <nav className="blog-post-nav">
        <section className="flex justify-between">
          {previous && (
            <Link to={previous.fields.slug} className="min-w-[33%]" rel="prev">
              <div className="rounded overflow-hidden shadow-md ring-1 ring-black/5">
                <div className="px-4 py-2">
                  <div className="mb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                      이전 게시글
                    </span>
                  </div>
                  <p className="text-gray-700 font-bold text-base">
                    {previous.frontmatter.title}
                  </p>
                </div>
              </div>
            </Link>
          )}
          <div className="flex-none">&nbsp;</div>
          {next && (
            <Link to={next.fields.slug} className="min-w-[33%]" rel="next">
              <div className="rounded overflow-hidden shadow-md ring-1 ring-black/5">
                <div className="px-4 py-2">
                  <div className="mb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2 ">
                      다음 게시글
                    </span>
                  </div>
                  <p className="text-gray-700 font-bold text-base">
                    {next.frontmatter.title}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </section>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }: HeadProps) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YY.MM.DD", locale: "ko-KR")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
