import { Slide, useScrollTrigger } from "@mui/material"

export default function HideOnScroll({
  children,
}: {
  children: React.ReactElement
}) {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
