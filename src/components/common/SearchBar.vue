<script setup lang="ts">
import { computed } from 'vue'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid'


const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed<string>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
const handleReset = () => value.value = ''

</script>

<template>
  <div class="relative">
    <MagnifyingGlassIcon class="h-full w-4 absolute left-2 top-0 text-black z-10" />
    <input
      v-model="value"
      type="text"
      class="py-2 px-8 rounded-lg w-full text-black placeholder-gray-500 bg-indigo-300"
      placeholder="Enter product name"
    >
    <XMarkIcon
      v-if="value"
      class="h-full w-4 absolute right-2 top-0 text-black z-10 cursor-pointer"
      @click="handleReset"
    />
  </div>
</template>
