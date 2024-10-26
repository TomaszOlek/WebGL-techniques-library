import React from 'react'

import {
  IconBadge,
  IconWrapper,
  IconSVG as StyledIconSVG,
} from 'components/atoms/Icon/Icon.style'
import { Image } from 'components/atoms/Image'

import { spreadProps } from 'utils/styled'

import { Color } from 'styles/theme'

// TODO: Change size to project standard
export type IconSizes = number
export type IconAsSVG = React.FC<React.SVGProps<SVGSVGElement>>
type IconRegularProps = {
  src: string
  size?: IconSizes
  onClick?: React.MouseEventHandler<unknown>
  className?: string
}
type IconSVGProps = {
  src: IconAsSVG
  size?: IconSizes
  fill?: string
  stroke?: string
  inline?: boolean
  onClick?: React.MouseEventHandler<unknown>
  className?: string
}
export type IconProps = (IconRegularProps | IconSVGProps) & {
  badge?: number
  badgeColor?: Color
}
export type IconSrc = IconProps['src']

export const IconRegular: React.FC<IconRegularProps> = ({
  src,
  size = 16,
  className,
  onClick,
}) => (
  <Image
    src={src}
    alt=""
    width={size}
    height={size}
    className={className}
    onClick={onClick}
    objectFit="contain"
    objectPosition="center"
  />
)

const IconSVG: React.FC<IconSVGProps> = ({
  src: SRC,
  size = 16,
  inline = false,
  ...props
}) => {
  return (
    <StyledIconSVG
      $width={size}
      $height={size}
      $inline={inline}
      {...spreadProps(props, ['fill', 'stroke'])}
    >
      <SRC width={size} height={size} />
    </StyledIconSVG>
  )
}

export const Icon: React.FC<IconProps> = ({
  src,
  size = 16,
  badge = undefined,
  badgeColor,
  ...props
}) => {
  return (
    <IconWrapper>
      {typeof src === 'string' ? (
        <IconRegular src={src} size={size} {...props} />
      ) : (
        <IconSVG src={src} size={size} {...props} />
      )}
      {badge !== undefined && <IconBadge color={badgeColor}>{badge}</IconBadge>}
    </IconWrapper>
  )
}
