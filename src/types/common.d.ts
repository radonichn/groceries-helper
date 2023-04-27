import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export interface IActionButton {
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>,
  classes: string | string[]
  onClick: Function
}
