<script setup>
</script>

<template>
  <div class="app-container">
    <nav class="main-nav">
      <router-link to="/home">Accueil</router-link>
      <router-link to="/game">Jouer</router-link>
      <router-link to="/stats">Statistiques</router-link>
    </nav>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>


