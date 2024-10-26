// Paste all the page related types like special Links or any other types that are used in multiple pages.
import type { ImageDataLike } from 'gatsby-plugin-image'

export type ClassicImageType = {
  src: ImageDataLike
  alt: string
}

export type LazyImageType = {
  src: ImageDataLike
  alt: string
}

export type ImageType = LazyImageType | ClassicImageType
