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
      </article>
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
