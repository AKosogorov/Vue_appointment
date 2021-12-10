<template>
  <v-app dark>
    <v-app-bar
      class="header"
      color="green"
      elevation="4"
      app
      dense
    >
      <Navbar />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '../components/NavBar'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  body {
    font-size: 1.5rem;
  }
</style>
