<script setup lang="ts">
import "./Footer.scss";
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">
        &copy; {{ new Date().getFullYear() }} Invex. Todos os direitos reservados
      </p>
    </div>
  </footer>
</template>
