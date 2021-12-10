<template>
  <v-container class="header__container">
    <nuxt-link
      to="/"
      class="nav-link"
    >
      Главная
    </nuxt-link>
    <nuxt-link
      to="/appointment"
      class="nav-link"
    >
      Запись на прием
    </nuxt-link>
    <!-- <v-switch
      v-model="$vuetify.theme.dark"
      inset
      label="Темная тема"
      persistent-hint
    /> -->
  </v-container>
</template>

<script>
export default {

}
</script>

<style>
  .header__container {
    display: flex;
    align-items: center;
  }

  .v-application .nav-link {
    margin-right: 30px;
    color: #fff;
  }

  .nav-link.nuxt-link-exact-active {
    font-weight: 600;
    color: black;
  }
</style>
