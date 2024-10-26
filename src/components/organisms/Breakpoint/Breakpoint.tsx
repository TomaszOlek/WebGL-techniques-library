import React from 'react'

import { Hidden } from 'components/atoms/Hidden'
import { Flex } from 'components/atoms/Spacing'

// import {useBreakpoint} from 'hooks/useBreakpoint'
import { BreakpointContainer } from './Breakpoint.style'

export const Breakpoint: React.FC = () => {
  // const { activeBreakpoint } = useBreakpoint()

  return (
    <BreakpointContainer>
      <Flex $gap="0.25rem" $align="center">
        BreakPoint:
        <Hidden $base="visible" $xs="hidden">
          base
        </Hidden>
        <Hidden $base="hidden" $xs="visible" $sm="hidden">
          xs
        </Hidden>
        <Hidden $base="hidden" $sm="visible" $md="hidden">
          sm
        </Hidden>
        <Hidden $base="hidden" $md="visible" $lg="hidden">
          md
        </Hidden>
        <Hidden $base="hidden" $lg="visible" $xl="hidden">
          lg
        </Hidden>
        <Hidden $base="hidden" $xl="visible" $xxl="hidden">
          xl
        </Hidden>
        <Hidden $base="hidden" $xxl="visible" $xl3="hidden">
          xxl
        </Hidden>
        <Hidden $base="hidden" $xl3="visible">
          xl3
        </Hidden>
      </Flex>
    </BreakpointContainer>
  )
}
