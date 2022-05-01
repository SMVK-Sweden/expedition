export interface KsamsokImageWithDescription {
  src: string
  description: string
}

export function compareKsamsokImageWithDescription(
  e1: KsamsokImageWithDescription,
  e2: KsamsokImageWithDescription
): boolean {
  return e1.src == e2.src && e1.description == e2.description
}
