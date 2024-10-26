import { PageProps } from 'gatsby'
import * as React from 'react'

import { Seo } from 'components/atoms/Seo'

import { Layout } from 'views/Layout'

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
