export const stringParameter = (value: FormDataEntryValue): string => {
  return value as string
}

export const oStringParameter = (
  value: FormDataEntryValue | null
): string | undefined => {
  return value == null ? undefined : (value as string)
}
