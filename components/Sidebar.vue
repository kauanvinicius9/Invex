<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container header__inner">
     
      <nav class="header__nav" :class="{active: isMenuOpen }">
        <NuxtLink to="/" @click="closeMenu">Início</NuxtLink>
        <NuxtLink to="/dashboard" @click="closeMenu">Dashboard</NuxtLink>
        <NuxtLink to="/investmentTable" @click="closeMenu">Evolução</NuxtLink>
        <NuxtLink to="/resultCard" @click="closeMenu">Resultado</NuxtLink>
        <NuxtLink to="/simulator" @click="closeMenu">Simulador</NuxtLink>
      </nav>
    
      <div class="header__actions">
        <button type="button" class="header__toggle" :class="{ active: isMenuOpen}" @click="toggleMenu" aria-label="Alternar menu de navegação">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

    </div>
  </header>
</template>
