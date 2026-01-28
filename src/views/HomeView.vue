<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useGame } from '../services/game'
import { pseudoKey } from '../plugins/profile'
import { gameLengthKey, gameMaxAttemptsKey } from '../plugins/gameConfig'

const router = useRouter()
const { code, generateCode } = useGame()
const globalPseudo = inject(pseudoKey)
const gameLength = inject(gameLengthKey, 4)
const maxAttempts = inject(gameMaxAttemptsKey, 10)
const localPseudo = ref('')
let intervalId = null

onMounted(() => {
  generateCode()
  intervalId = setInterval(generateCode, 2000)
})

onUnmounted(() => clearInterval(intervalId))

const submitPseudo = () => {
  if (localPseudo.value.trim()) {
    globalPseudo.value = localPseudo.value.trim()
    router.push('/game')
  }
}
</script>

<template>
  <div>
    <h1>CODE BREAKER</h1>
    <p>Code animé : {{ code.join(' ') }}</p>

    <section>
      <h2>Règles</h2>
      <p>Trouvez le code de {{ gameLength }} chiffres uniques en {{ maxAttempts }} essais.</p>
    </section>

    <form @submit.prevent="submitPseudo">
      <input v-model="localPseudo" placeholder="Pseudo" required />
      <button type="submit">Jouer</button>
    </form>
  </div>
</template>

<style scoped>
input, button { padding: 5px; margin-top: 10px; }
</style>
