import { GatsbyBrowser, GatsbySSR } from 'gatsby'
import { Provider as StoreProvider } from 'jotai'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { store } from './src/store'
import { default as GlobalStyles } from './src/styles/global'
import { default as theme } from './src/styles/theme'

type WrapRootElement = GatsbyBrowser['wrapRootElement'] &
  GatsbySSR['wrapRootElement']
type WrapPageElement = GatsbyBrowser['wrapPageElement'] &
  GatsbySSR['wrapPageElement']

export const wrapRootElement: WrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <StoreProvider store={store}>{element}</StoreProvider>
  </ThemeProvider>
)

export const wrapPageElement: WrapPageElement = ({ element }) => (
  <>
    <GlobalStyles />
    {element}
  </>
)
