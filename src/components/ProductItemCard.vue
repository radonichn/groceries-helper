<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'

import type { IProductItem } from '@/types/productItem'
import type { IActionButton } from '@/types/common'
import { hideBodyScroll, showBodyScroll } from '@/utils/overflow-helper'

defineProps<{
  product: IProductItem
}>()

const actionButtons: IActionButton[] = [
  {
    icon: PencilIcon,
    onClick: () => {},
  },
  {
    icon: TrashIcon,
    onClick: () => {},
  },
]

const isAddSwipeTransition = ref<boolean>(false)
const handleSetIsAddSwipeTransition = (value: boolean) => {
  isAddSwipeTransition.value = value
}

const swipeOffset = ref<number>(0)
const swipeOffsetMax = ref<number>(137)
const swipeStartXPosition = ref<number>(0)
const swipeMoveXPosition = ref<number>(0)
const handleShowButtons = () => {
  swipeOffset.value = swipeOffsetMax.value
}
const handleHideButtons = () => {
  swipeOffset.value = 0
}
const getTouchXPosition = (event: TouchEvent) => event.touches[0].pageX
const handleTouchStart = (event: TouchEvent) => {
  handleSetIsAddSwipeTransition(false)
  swipeStartXPosition.value = getTouchXPosition(event)
  hideBodyScroll()
}
const handleTouchMove = (event: TouchEvent) => {
  swipeMoveXPosition.value = getTouchXPosition(event)
  const positionDelta = swipeStartXPosition.value - swipeMoveXPosition.value
  if (swipeStartXPosition.value > swipeMoveXPosition.value) {
    swipeOffset.value = positionDelta
  } else {
    swipeOffset.value = swipeOffsetMax.value + positionDelta
  }
}
const handleTouchEnd = () => {
  handleSetIsAddSwipeTransition(true)
  showBodyScroll()
  if (swipeStartXPosition.value > swipeMoveXPosition.value) {
    handleShowButtons()
  } else {
    handleHideButtons()
  }
}

const handleToggleRightMouseClick = () => {
  handleSetIsAddSwipeTransition(true)
  nextTick(() => {
    if (!swipeOffset.value) {
      handleShowButtons()
    } else {
      handleHideButtons()
    }
  })
}
</script>

<template>
  <div class="flex w-full overflow-hidden">
    <div
      class="px-4 py-7 rounded-lg text-black flex items-center cursor-pointer min-w-full bg-gradient-to-r from-indigo-900/0 to-white/40"
      :class="{ 'transition-all delay-300': isAddSwipeTransition }"
      :style="{ marginLeft: `-${swipeOffset}px` }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleHideButtons"
      @contextmenu.prevent="handleToggleRightMouseClick"
    >
      <div class="mr-4 w-32 flex items-center justify-center">
        <img
          :src="product.productImageUrl"
          alt="Product image"
          class="w-auto max-w-32 min-h-16 max-h-16"
        >
      </div>
      <div class="text-white">
        <p class="text-xl font-medium">
          {{ product.productName }}
        </p>
        <p class="text-sm font-medium">
          Code: {{ product.productCode }}
        </p>
      </div>
    </div>
    <div class="flex items-center">
      <div
        v-for="actionButton of actionButtons"
        :key="actionButton.icon"
        class="h-full w-14 flex items-center justify-center ml-3 rounded-lg bg-indigo-700 cursor-pointer transition-transform active:scale-95"
        @click="actionButton.onClick"
      >
        <component
          :is="actionButton.icon"
          class="w-6 text-white"
        />
      </div>
    </div>
  </div>
</template>
