import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export type MenuLink = {
  icon?: IconDefinition,
  class?: string,
  path?: string[],
  text?: string,
  tooltipText?: string
  callback?: Function
  canActivate?: boolean
}
