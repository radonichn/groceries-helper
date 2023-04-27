<script setup lang="ts">
import { ref } from 'vue'

import type { IProductItem } from '@/types/productItem'
import type { IActionButton } from '@/types/common'
import { hideBodyScroll, showBodyScroll } from '@/utils/overflow-helper'

defineProps<{
  product: IProductItem
}>()

const actionButtons: IActionButton[] = [
  {
    icon: '1',
    classes: 'bg-blue-600',
    onClick: () => {},
  },
  {
    icon: '2',
    classes: 'bg-red-600',
    onClick: () => {},
  },
]

const swipeOffset = ref<number>(0)
const swipeOffsetMax = ref<number>(152)
const swipeStartXPosition = ref<number>(0)
const swipeMoveXPosition = ref<number>(0)
const isAddSwipeTransition = ref<boolean>(false)
const handleShowButtons = () => {
  swipeOffset.value = swipeOffsetMax.value
}
const handleHideButtons = () => {
  swipeOffset.value = 0
}
const getTouchXPosition = (event: TouchEvent) => event.touches[0].pageX
const handleTouchStart = (event: TouchEvent) => {
  isAddSwipeTransition.value = false
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
  isAddSwipeTransition.value = true
  showBodyScroll()
  if (swipeStartXPosition.value > swipeMoveXPosition.value) {
    handleShowButtons()
  } else {
    handleHideButtons()
  }
}
</script>

<template>
  <div class="flex w-full overflow-hidden">
    <div
      class="px-4 py-7 bg-white rounded-lg text-black flex items-center cursor-pointer min-w-full"
      :class="{ 'transition-all delay-300': isAddSwipeTransition }"
      :style="{ marginLeft: `-${swipeOffset}px` }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="mr-4 w-32 flex items-center justify-center">
        <img
          :src="product.productImageUrl"
          alt="Product image"
          class="w-auto max-w-32 min-h-16 max-h-16"
        >
      </div>
      <div>
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
        :class="actionButton.classes"
        class="p-7 h-full flex items-center ml-3 rounded-lg text-white"
        @click="actionButton.onClick"
      >
        {{ actionButton.icon }}
      </div>
    </div>
  </div>
</template>
