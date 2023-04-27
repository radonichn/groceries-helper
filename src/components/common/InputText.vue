<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  placeholder: string
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
</script>

<template>
  <input
    v-model="value"
    type="text"
    class="py-2 px-4 rounded-lg w-full text-black placeholder-gray-500 bg-indigo-300"
    :placeholder="placeholder"
  >
</template>
