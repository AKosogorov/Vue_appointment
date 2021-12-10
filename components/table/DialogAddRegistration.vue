<template>
  <v-dialog
    v-model="$store.getters.getDialogAddRegistrationVisible"
    max-width="600"
    @click:outside="$store.commit('hideAddRegistration')"
  >
    <v-card>
      <h3 class="form-add__title">
        TODO: форма добавления записи на прием
      </h3>
      <v-card-actions>
        <BtnCloseDialog
          @closeDialog="$store.commit('hideAddRegistration')"
        />
        <BtnAddRegistragion
          @addRegistration="$store.commit('hideAddRegistration')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BtnAddRegistragion from './BtnAddRegistragion'
import BtnCloseDialog from './BtnCloseDialog'

export default {
  components: {
    BtnAddRegistragion,
    BtnCloseDialog
  }
}
</script>

<style>
  .form-add__title {
    padding: 16px;
  }
</style>
