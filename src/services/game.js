import { ref } from 'vue'

export function useGame() {
  const code = ref([])
  const attempts = ref([])
  const state = ref('playing') // 'playing', 'won', 'lost'

  const generateCode = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i)
    const newCode = []
    
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length)
      newCode.push(numbers.splice(randomIndex, 1)[0])
    }
    
    code.value = newCode
    attempts.value = []
    state.value = 'playing'
    return newCode
  }

  const validateAttempt = (userAttempt) => {
    if (state.value !== 'playing') return null

    let wellPlaced = 0
    let wrongPlaced = 0
    
    const secretCopy = [...code.value]
    const attemptCopy = [...userAttempt]

    for (let i = 0; i < secretCopy.length; i++) {
      if (attemptCopy[i] === secretCopy[i]) {
        wellPlaced++
        secretCopy[i] = null
        attemptCopy[i] = null
      }
    }

    for (let i = 0; i < attemptCopy.length; i++) {
      if (attemptCopy[i] !== null) {
        const foundIndex = secretCopy.indexOf(attemptCopy[i])
        if (foundIndex !== -1) {
          wrongPlaced++
          secretCopy[foundIndex] = null
        }
      }
    }

    const result = {
      combination: [...userAttempt],
      wellPlaced,
      wrongPlaced
    }

    attempts.value.push(result)

    if (wellPlaced === 4) {
      state.value = 'won'
    } else if (attempts.value.length >= 10) {
      state.value = 'lost'
    }

    return result
  }

  return {
    code,
    attempts,
    state,
    generateCode,
    validateAttempt
  }
}
