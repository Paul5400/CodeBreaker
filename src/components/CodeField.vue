<script setup>
import { computed, nextTick } from 'vue'

const props = defineProps({
  length: { type: Number, required: true }
})

const modelValue = defineModel({ type: Array, default: () => [] })
const emit = defineEmits(['submit'])

const fields = computed(() => Array.from({ length: props.length }, (_, i) => i + 1))

const updateDigit = (index, event) => {
  const val = event.target.value
  if (val && !isNaN(val)) {
    const newVal = [...modelValue.value]
    newVal[index] = parseInt(val)
    modelValue.value = newVal
    event.target.nextElementSibling?.focus()
  }
}

const handleKeyDown = (index, event) => {
  if (event.key === 'Backspace' && !modelValue.value[index]) {
    event.target.previousElementSibling?.focus()
  }
}

const submit = () => {
  if (modelValue.value.length === props.length && !modelValue.value.includes(undefined)) {
    emit('submit', [...modelValue.value])
    modelValue.value = []
    nextTick(() => document.querySelector('input')?.focus())
  }
}
</script>

<template>
  <div>
    <input
      v-for="(num, index) in fields"
      :key="num"
      type="text"
      maxlength="1"
      style="width: 30px; margin: 2px; text-align: center;"
      :value="modelValue[index]"
      @input="updateDigit(index, $event)"
      @keydown="handleKeyDown(index, $event)"
    />
    <button @click="submit" :disabled="modelValue.length !== length">Valider</button>
  </div>
</template>
