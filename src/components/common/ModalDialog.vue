<script setup lang="ts">
import { computed } from 'vue'
import InputText from '@/components/common/InputText.vue'
import FormButton from '@/components/common/FormButton.vue'

const props = defineProps<{
  modelValue: boolean
  title: string
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed<boolean>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const handleClose = () => {
  value.value = false
  console.log('closedddd')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="value"
        class="bg-black/60 w-full h-full z-50 fixed left-0 top-0 backdrop-blur-sm bg-gradient-to-r from-indigo-900/0 via-white/20 to-indigo-900/0 flex items-center justify-center"
        @click.self="handleClose"
      >
        <div class="w-96 max-w-9/12 p-6">
          <p class="text-white text-center font-bold text-xl mb-8">
            {{ title }}
          </p>
          <InputText
            model-value=""
            class="mb-4"
          />
          <InputText
            model-value=""
            class="mb-4"
          />
          <InputText
            model-value=""
            class="mb-4"
          />
          <FormButton>
            Save
          </FormButton>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
