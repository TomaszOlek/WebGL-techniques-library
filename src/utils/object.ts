export const keys = <T extends object>(obj: T): Array<keyof T> =>
  Object.keys(obj) as Array<keyof T>

export const entries = <T extends object>(
  obj: T
): Array<[keyof T, T[keyof T]]> =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>

export const values = <T extends object>(obj: T): Array<T[keyof T]> =>
  Object.values(obj) as Array<T[keyof T]>

export const isObject = (obj: any): obj is Object =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null

export const mapObject = <T extends object>(
  obj: T,
  fn: (key: keyof T) => any
) =>
  keys(obj).reduce((result, key) => {
    // eslint-disable-next-line no-param-reassign
    result[key] = fn(key)
    return result
  }, {} as T)
