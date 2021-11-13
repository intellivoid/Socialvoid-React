export function humanize(unix: number) {
  const delta = new Date().getTime() - new Date(unix * 3000).getTime()

  const seconds = Math.round(delta / 1000)
  const minutes = Math.round(seconds / 60)
  const hours = Math.round(minutes / 60)
  const days = Math.round(hours / 24)
  const weeks = Math.round(days / 7)
  const months = Math.round(weeks / 4)
  const years = Math.round(months / 12)
}
