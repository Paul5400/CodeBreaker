<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGame } from '../services/game'
import { pseudoKey } from '../plugins/profile'
import CodeField from '../components/CodeField.vue'

const router = useRouter()
const pseudo = inject(pseudoKey)
const { code, attempts, state, generateCode, validateAttempt } = useGame()
const currentGuess = ref([])

onMounted(() => {
  if (!pseudo.value) {
    router.push('/home')
    return
  }
  generateCode()
})

const restartGame = () => generateCode()
const handleValidation = (combination) => {
  const result = validateAttempt(combination)
  if (state.value !== 'playing') {
    const history = JSON.parse(localStorage.getItem('gameHistory') || '[]')
    history.push({
      pseudo: pseudo.value,
      code: [...code.value],
      state: state.value,
      lastAttempt: result,
      date: new Date().toLocaleString()
    })
    localStorage.setItem('gameHistory', JSON.stringify(history))
  }
}

const welcomeMessage = computed(() => {
  if (state.value === 'won') return `Gagné ${pseudo.value} !`
  if (state.value === 'lost') return `Perdu ${pseudo.value} !`
  return `Agent ${pseudo.value}, jouez.`
})
</script>

<template>
  <div>
    <h2>{{ welcomeMessage }}</h2>
    <p v-if="state === 'playing'">Essai {{ attempts.length + 1 }} / 10</p>

    <div v-if="state !== 'playing'">
      <button @click="restartGame">Recommencer</button>
    </div>

    <section v-if="state === 'playing'">
      <CodeField :length="4" v-model="currentGuess" @submit="handleValidation" />
    </section>

    <section>
      <h3>Historique</h3>
      <div v-for="(att, i) in [...attempts].reverse()" :key="i" style="border-bottom: 1px solid #ccc; padding: 5px;">
        {{ att.combination.join(' ') }} -> Bien placés: {{ att.wellPlaced }}, Mal placés: {{ att.wrongPlaced }}
      </div>
    </section>
  </div>
</template>
