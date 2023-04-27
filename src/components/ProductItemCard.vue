<script setup lang="ts">
import { ref, computed } from 'vue'

import type { IProductItem, ITouchXPositions } from '@/types/productItem'
import type { IActionButton } from '@/types/common'

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

const swipeContainer = ref<HTMLDivElement | null>(null)
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
  swipeStartXPosition.value = getTouchXPosition(event)
}
const handleTouchMove = (event: TouchEvent) => {
  if (!swipeContainer.value) {
    return
  }
  const parentRightX = swipeContainer.value.offsetLeft + swipeContainer.value.offsetWidth
  swipeOffset.value = parentRightX - getTouchXPosition(event)
  swipeMoveXPosition.value = getTouchXPosition(event)
}
const handleTouchEnd = () => {
  console.log(swipeStartXPosition.value, swipeMoveXPosition.value, `${swipeStartXPosition.value > swipeMoveXPosition.value} - is swipe to the left`)
  if (swipeStartXPosition.value > swipeMoveXPosition.value) {
    handleShowButtons()
  } else {
    handleHideButtons()
  }
}
</script>

<template>
  <div
    ref="swipeContainer"
    class="flex w-full overflow-hidden"
  >
    <div
      class="px-4 py-7 bg-white rounded-lg text-black flex items-center cursor-pointer min-w-full"
      :class="{ 'transition-all delay-300': isAddSwipeTransition }"
      :style="{ marginLeft: `-${swipeOffset}px` }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <img
        :src="product.productImageUrl"
        alt="Product image"
        class="mr-4 w-32"
      >
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
