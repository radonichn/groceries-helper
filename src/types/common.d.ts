import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export interface IActionButton {
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>,
  onClick: Function
}
