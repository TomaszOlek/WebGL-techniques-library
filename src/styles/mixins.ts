/* eslint-disable import/prefer-default-export */
import { fonts } from 'styles/theme'

export const pxToRem = (pixels: number) =>
  pixels / parseInt(fonts.size.replace('px', ''), 10)
