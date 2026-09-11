<script setup lang="ts">
import { ref } from "vue";
import "./Sidebar.scss";

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header" :class="{ 'is-open': isMenuOpen }">
    <div class="container header__inner">
     
      <div class="header__actions">
        <button type="button" class="header__toggle" :class="{ active: isMenuOpen}" @click="toggleMenu" aria-label="Alternar menu de navegação">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="header__nav" :class="{active: isMenuOpen }">
        <NuxtLink to="/" @click="closeMenu">Início</NuxtLink>
        <NuxtLink to="/dashboard" @click="closeMenu">Dashboard</NuxtLink>
        <NuxtLink to="/simulator" @click="closeMenu">Simulador</NuxtLink>
      </nav>
    
    </div>
  </header>

  <div v-if="isMenuOpen" class="header__backdrop" @click="closeMenu"></div>
</template>
