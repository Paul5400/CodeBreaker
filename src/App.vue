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

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Outfit:wght@400;700&display=swap');

:root {
  --primary: #6366f1;
  --secondary: #a855f7;
  --accent: #f43f5e;
  --background: #0f172a;
  --surface: #1e293b;
  --text: #f8fafc;
  --text-muted: #94a3b8;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--background);
  color: var(--text);
  min-height: 100vh;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.main-nav {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  justify-content: center;
}

.main-nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.main-nav a:hover, .main-nav a.router-link-active {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

.main-nav a.router-link-active {
  color: var(--primary);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
