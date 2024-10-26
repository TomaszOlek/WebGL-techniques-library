import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'

export type SeoProps = {
  title: string
  description?: string
  meta?: JSX.IntrinsicElements['meta'][]
  lang?: string
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: string | null
  twitterTitle?: string | null
  twitterDescription?: string | null
  twitterImage?: string | null
  robots?: string
}

type SiteMetadata = {
  site: { siteMetadata: { title: string; description: string; author: string } }
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  lang = 'en',
  meta = [],
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  robots = process.env.GATSBY_ROBOTS || 'noindex, nofollow',
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<SiteMetadata>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || siteMetadata.description

  const defaultMeta = [
    {
      property: `robots`,
      content: robots,
    },
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: ogTitle || title,
    },
    {
      property: `og:description`,
      content: ogDescription || metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: siteMetadata?.author || ``,
    },
    {
      name: `twitter:title`,
      content: twitterTitle || title,
    },
    {
      name: `twitter:description`,
      content: twitterDescription || metaDescription,
    },
  ]

  if (ogImage) {
    defaultMeta.push({ name: `og:image`, content: ogImage })
  }

  if (twitterImage) {
    defaultMeta.push({ name: `twitter:image`, content: twitterImage })
  }

  const combinedMeta = meta ? defaultMeta : [...defaultMeta, ...meta!]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate="%s"
      meta={combinedMeta}
    />
  )
}
