import scssBreakpoints from '#vris/app/assets/styles/breakpoints.module.scss'
import { useBreakpoints } from '@vueuse/core'

const { max, medium, pc, min, sp } = scssBreakpoints

export const breakpoints = useBreakpoints({
  max: String(max),
  medium: String(medium),
  pc: String(pc),
  min: String(min),
  sp: String(sp),
})
