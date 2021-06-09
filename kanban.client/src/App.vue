<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-details text-light text-center p-4">
      Can You Do The <i class="fas fa-spray-can">
        BAN
      </i>??
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
.bg-details{
background-color: #07000d;
background-image: url("https://www.transparenttextures.com/patterns/brushed-alum-dark.png");
}

</style>
