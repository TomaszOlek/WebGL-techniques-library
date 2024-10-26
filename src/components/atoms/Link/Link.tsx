import { Link as GatsbyLink } from 'gatsby'
import { LocalizedLink } from 'gatsby-theme-i18n'
import React, { AnchorHTMLAttributes, PropsWithChildren } from 'react'

const ExternalLink: React.FC<
  PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>
> = ({ children, ...props }) => <a {...props}>{children}</a>
const LocalLink = LocalizedLink
const LinkWithoutLocalization = GatsbyLink

type LinkProps = {
  to: string | undefined
  language?: 'pl' | 'en'
  ignoreLanguage?: boolean
  className?: string
}
const INTERNAL_LINK_START = ['/', '#', './']
export const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  to,
  language,
  ignoreLanguage = false,
  ...props
}) => {
  const link = to ?? '#'

  return !INTERNAL_LINK_START.some((start) => link?.startsWith(start)) ? (
    <ExternalLink
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </ExternalLink>
  ) : ignoreLanguage ? (
    <LinkWithoutLocalization to={link} {...props}>
      {children}
    </LinkWithoutLocalization>
  ) : (
    <LocalLink to={link} language={language} {...props}>
      {children}
    </LocalLink>
  )
}

export const Email: React.FC<PropsWithChildren<{ email: string }>> = ({
  children,
  email,
}) => <Link to={`mailto:${email}`}>{children}</Link>

export const Phone: React.FC<PropsWithChildren<{ phone: string }>> = ({
  children,
  phone,
}) => <Link to={`tel:${phone.replaceAll(/\s/g, '')}`}>{children}</Link>
