import {
  GatsbyImage,
  GatsbyImageProps,
  IGatsbyImageData,
  ImageDataLike,
  getImage,
} from 'gatsby-plugin-image'
import React from 'react'

import { TypedOmit } from 'utils/types'

import { ImageInner, ImageWrapper } from './Image.style'

type ClassicImageProps = {
  src: string
} & TypedOmit<ImageProps, 'src'>

export const ClassicImage: React.FC<ClassicImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit,
  objectPosition,
  loading,
  className,
  radius,
  ...props
}) => {
  return (
    <ImageWrapper
      $width={width}
      $height={height}
      $objectFit={objectFit}
      className={className}
    >
      <ImageInner
        src={src}
        alt={alt}
        $objectFit={objectFit}
        $objectPosition={objectPosition}
        width={width}
        height={height}
        $radius={radius}
        {...props}
      />
    </ImageWrapper>
  )
}

type LazyImageProps = {
  src: ImageDataLike
} & TypedOmit<ImageProps, 'src'>

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit,
  objectPosition,
  className,
  radius,
  ...props
}) => {
  const image = getImage(src) as IGatsbyImageData

  return (
    <ImageWrapper
      $width={width}
      $height={height}
      $objectFit={objectFit}
      className={className}
      $radius={radius}
    >
      <GatsbyImage
        image={image}
        alt={alt}
        objectFit={objectFit}
        objectPosition={objectPosition}
        {...props}
      />
    </ImageWrapper>
  )
}

type ImageProps = {
  src: ImageDataLike | string
  alt: string
  width?: number
  height?: number
  objectFit?: React.CSSProperties['objectFit']
  objectPosition?: React.CSSProperties['objectPosition']

  className?: string
  onClick?: React.MouseEventHandler<HTMLImageElement>
  onLoad?: () => void
  onError?: React.ReactEventHandler<HTMLImageElement>
  loading?: GatsbyImageProps['loading']
  radius?: number
}
export type ImageSrc = ImageProps['src']
export const Image: React.FC<ImageProps> = ({ src, ...props }) => {
  if (typeof src === 'string') {
    return <ClassicImage src={src} {...props} />
  }
  return <LazyImage src={src} {...props} />
}
