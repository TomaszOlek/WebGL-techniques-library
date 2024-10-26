import { Leva } from 'leva'
import React from 'react'

import { Breakpoint } from 'components/organisms/Breakpoint'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {process.env.GATSBY_BREAKPOINT_PREVIEW && <Breakpoint />}

      <Leva />

      <main>{children}</main>
    </>
  )
}
