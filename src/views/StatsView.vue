<script setup>
import { ref, onMounted } from 'vue'

const history = ref([])

onMounted(() => {
  const saved = localStorage.getItem('gameHistory')
  if (saved) {
    history.value = JSON.parse(saved)
  }
})
</script>

<template>
  <div>
    <h1>Historique des scores</h1>

    <div v-if="history.length > 0">
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Date</th>
            <th>Joueur</th>
            <th>Code</th>
            <th>Résultat</th>
            <th>Dernier essai</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, idx) in [...history].reverse()" :key="idx">
            <td>{{ game.date }}</td>
            <td>{{ game.pseudo }}</td>
            <td>{{ game.code.join(' ') }}</td>
            <td>{{ game.state === 'won' ? 'Gagné' : 'Perdu' }}</td>
            <td>
              {{ game.lastAttempt?.combination.join(' ') }} 
              (🎯:{{ game.lastAttempt?.wellPlaced }}, 🔄:{{ game.lastAttempt?.wrongPlaced }})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Aucune partie enregistrée.</p>
  </div>
</template>

<style scoped>
th, td { padding: 8px; text-align: left; }
</style>
