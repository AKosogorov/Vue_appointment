<template>
  <v-select
    label="Период записей"
    prepend-icon="mdi-calendar"
    :items="$store.getters.getWeeks"
    @change="selectWeek"
  />
</template>

<script>
import { mapMutations } from 'vuex'

export default {

  mounted () {
    this.setWeeks()
  },

  methods: {
    ...mapMutations(['setSelectWeek', 'setHeaders', 'setWeeks']),

    selectWeek (week) {
      this.setSelectWeek(week)
      this.setHeaders(week)
    }
  }
}
</script>

<style>

</style>
