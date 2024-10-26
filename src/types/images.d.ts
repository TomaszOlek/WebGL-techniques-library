declare module '*.png' {
  const value: string
  export = value
}

declare module '*.jpg' {
  const value: string
  export = value
}

declare module '*.jpeg' {
  const value: string
  export = value
}

declare module '*.webp' {
  const value: string
  export = value
}

declare module '*.gif' {
  const value: string
  export = value
}

declare module '*.svg' {
  import { FC, SVGProps } from 'react'

  export const ReactComponent: FC<
    SVGProps<SVGSVGElement> & {
      title?: string
    }
  >
  const value: string
  export default value
}
