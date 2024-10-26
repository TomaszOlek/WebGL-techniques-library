import { PageProps, graphql } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Button } from 'components/atoms/Button'
import { Container } from 'components/atoms/Container'
import { Hidden } from 'components/atoms/Hidden'
import { Icon } from 'components/atoms/Icon'
import { Image } from 'components/atoms/Image'
import { Link } from 'components/atoms/Link'
import { Seo } from 'components/atoms/Seo'
import { Flex, Grid, GridItem, Padding } from 'components/atoms/Spacing'
import { H400, H500, H600, Text } from 'components/atoms/Typography'

import { DummyForm } from 'components/organisms/DummyForm'

import { Layout } from 'views/Layout'

import { ReactComponent as HolderIcon } from 'assets/icons/holder.svg'
import coverImage from 'assets/images/cover.jpg'

const GridItemContent = styled.div`
  height: 100%;
  width: 100%;

  background-color: red;
`

const StyledGrid = styled(Grid)`
  height: 500px;
`

const ImageWrapper = styled.div`
  max-width: 300px;
`

const PreviewPage: React.FC<PageProps<Queries.PreviewPageQuery>> = ({
  data,
}) => {
  const { i18n } = useTranslation('hello')

  return (
    <Layout>
      <Seo title="Preview" lang={i18n.language} />
      <Padding $base="30px 0px" $lg="94px 0px">
        <Container $variant="slim">
          <Flex $gap="50px" $direction="column">
            {/* Typography */}
            <Flex $gap="13px" $direction="column">
              <Text
                $color="secondary"
                $base={H600}
                dangerouslySetInnerHTML={{ __html: 'Typography' }}
              />

              <Text
                $base={H400}
                $lg={H500}
                dangerouslySetInnerHTML={{
                  __html: 'Text Resize on breakpoint',
                }}
              />
            </Flex>

            <Flex $gap="13px" $direction="column">
              <Text
                $color="secondary"
                $base={H600}
                dangerouslySetInnerHTML={{ __html: 'DummyForm' }}
              />

              <DummyForm />
            </Flex>

            {/* Grid */}
            <Flex $gap="13px" $direction="column">
              <Text
                $color="secondary"
                $base={H600}
                dangerouslySetInnerHTML={{ __html: 'Grid' }}
              />

              <StyledGrid
                $gap={{
                  base: '10px',
                  lg: '15px 25px',
                }}
                $columns={{
                  base: 1,
                  lg: 3,
                }}
              >
                <GridItem
                  $columns={{
                    base: 1,
                    lg: 2,
                  }}
                >
                  <GridItemContent />
                </GridItem>
                <GridItem
                  $rows={{
                    base: 1,
                    lg: 2,
                  }}
                >
                  <GridItemContent />
                </GridItem>
                <GridItem $columns={2} $rows={2}>
                  <GridItemContent />
                </GridItem>
                <GridItem>
                  <GridItemContent />
                </GridItem>
              </StyledGrid>
            </Flex>

            {/* Image */}
            <Flex $gap="13px" $direction="column">
              <Text
                $color="secondary"
                $base={H600}
                dangerouslySetInnerHTML={{ __html: 'Image' }}
              />
              <Flex $gap="10px">
                <ImageWrapper>
                  <Image
                    src={data.holderImage?.childImageSharp?.gatsbyImageData!}
                    alt=""
                    radius={10}
                    objectFit="cover"
                  />
                </ImageWrapper>

                <ImageWrapper>
                  <Image src={coverImage} alt="" radius={5} objectFit="cover" />
                </ImageWrapper>
              </Flex>
            </Flex>

            {/* Button */}
            <Flex $gap="13px" $direction="column">
              <Text
                $color="secondary"
                $base={H600}
                dangerouslySetInnerHTML={{ __html: 'Button' }}
              />
              <Flex $gap="20px" $direction="column">
                <Flex $gap="10px">
                  <Button>Button</Button>

                  <Button disabled>Button</Button>

                  <Button $loading>Button</Button>

                  <Button>
                    <Flex $gap="8px" $align="center">
                      Button
                      <Icon src={HolderIcon} size={12} />
                    </Flex>
                  </Button>

                  <Button $iconOnly $size="small">
                    <Icon src={HolderIcon} />
                  </Button>

                  <Button $iconOnly>
                    <Icon src={HolderIcon} />
                  </Button>

                  <Button $iconOnly $size="large">
                    <Icon src={HolderIcon} />
                  </Button>
                </Flex>

                <Flex $gap="10px">
                  <Button $variant="secondary">Button</Button>

                  <Button disabled $variant="secondary">
                    Button
                  </Button>

                  <Button $loading $variant="secondary">
                    Button
                  </Button>

                  <Button $variant="secondary">
                    <Flex $gap="8px" $align="center">
                      Button
                      <Icon src={HolderIcon} size={12} />
                    </Flex>
                  </Button>

                  <Button $iconOnly $size="small" $variant="secondary">
                    <Icon src={HolderIcon} />
                  </Button>

                  <Button $iconOnly $variant="secondary">
                    <Icon src={HolderIcon} />
                  </Button>

                  <Button $iconOnly $size="large" $variant="secondary">
                    <Icon src={HolderIcon} />
                  </Button>
                </Flex>

                <Flex $gap="10px">
                  <Button $variant="tertiary">Button</Button>

                  <Button disabled $variant="tertiary">
                    Button
                  </Button>

                  <Button $loading $variant="tertiary">
                    Button
                  </Button>

                  <Button $variant="tertiary">
                    <Flex $gap="8px" $align="center">
                      Button
                      <Icon src={HolderIcon} size={12} />
                    </Flex>
                  </Button>

                  <Button $iconOnly $size="small" $variant="tertiary">
                    <Icon src={HolderIcon} />
                  </Button>

                  <Button $iconOnly $variant="tertiary">
                    <Icon src={HolderIcon} />
                  </Button>

                  <Button $iconOnly $size="large" $variant="tertiary">
                    <Icon src={HolderIcon} />
                  </Button>
                </Flex>

                <Flex $gap="10px">
                  <Button $variant="transparent">Button</Button>

                  <Button disabled $variant="transparent">
                    Button
                  </Button>

                  <Button $loading $variant="transparent">
                    Button
                  </Button>

                  <Button $variant="transparent">
                    <Flex $gap="8px" $align="center">
                      Button
                      <Icon src={HolderIcon} size={12} />
                    </Flex>
                  </Button>

                  <Button $iconOnly $size="small" $variant="transparent">
                    <Icon src={HolderIcon} />
                  </Button>

                  <Button $iconOnly $variant="transparent">
                    <Icon src={HolderIcon} />
                  </Button>

                  <Button $iconOnly $size="large" $variant="transparent">
                    <Icon src={HolderIcon} />
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            {/* Hidden */}
            <Flex $gap="13px" $direction="column">
              <Text
                $color="secondary"
                $base={H600}
                dangerouslySetInnerHTML={{ __html: 'Hidden' }}
              />

              <Hidden $base="visible" $lg="hidden">
                I'm visible on mobile
              </Hidden>

              <Hidden $base="hidden" $lg="visible">
                I'm visible on desktop
              </Hidden>
            </Flex>

            {/* Link */}
            <Flex $gap="13px" $direction="column">
              <Text
                $color="secondary"
                $base={H600}
                dangerouslySetInnerHTML={{ __html: 'Link' }}
              />

              <Link to="/">Link inside page</Link>

              <Link to="https://www.google.co.uk/">Link outside page</Link>
            </Flex>
          </Flex>
        </Container>
      </Padding>
    </Layout>
  )
}

export default PreviewPage

export const query = graphql`
  query PreviewPage {
    holderImage: file(name: { eq: "cover" }) {
      childImageSharp {
        gatsbyImageData(width: 1920)
      }
    }
  }
`

/**  How to get the data from the CMS with localized content?
   page: wpPage(
     language: { slug: { eq: $locale } } // Pass the locale as a variable to filter the page by language
     slug: { regex: "/strona-glowna|homepage/" } // Slugs of the pages in the CMS for each language
   ) {
     title // Data from the CMS
   }
*/
