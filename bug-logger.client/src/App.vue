<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <router-view />
    </div>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made by CyberTomb
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.creator-picture{
  border-radius: 50%;
  object-fit: cover;
  width: 6rem;
  height: 6rem;
}
.action{
  cursor: pointer;
}
</style>
