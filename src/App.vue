<script setup>
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/home">Accueil</router-link> |
      <router-link to="/game">Jouer</router-link> |
      <router-link to="/stats">Stats</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
body { font-family: sans-serif; padding: 20px; }
nav { margin-bottom: 20px; }
.router-link-active { font-weight: bold; }
</style>
