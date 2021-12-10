<template>
  <v-container class="conteiner__table">
    <v-row class="align-center table__actions">
      <v-col
        cols="8"
      >
        <SelectWeek />
      </v-col>
      <v-spacer />
      <BtnAddRegistragion />
    </v-row>
    <Loader v-if="$store.getters.getLoading" />
    <v-simple-table v-else>
      <thead class="table__head">
        <tr>
          <td />
          <TableHeading
            v-for="header of $store.getters.getHeadersTable"
            :key="header.weekDay"
            :header="header"
          />
        </tr>
      </thead>
      <tbody v-if="$store.getters.getHeadersTable.length > 0">
        <tr
          v-for="time of timeRegistration"
          :key="time"
          class="table__row"
        >
          <td class="table__cell table__time text-center">
            {{ time }}
          </td>
          <TableCell
            v-for="num of 7"
            :key="num"
            :time="time"
            :current-date="$store.getters.getHeadersTable[num - 1]"
          />
        </tr>
      </tbody>
    </v-simple-table>
    <DialogCell />
    <DialogAddRegistration />
  </v-container>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

import TableHeading from '../components/table/TableHeading'
import TableCell from '../components/table/TableCell'
import DialogCell from '../components/table/DialogCell'
import DialogAddRegistration from '../components/table/DialogAddRegistration'
import SelectWeek from '../components/table/SelectWeek'
import BtnAddRegistragion from '../components/table/BtnAddRegistragion'
import Loader from '../components/Loader'

export default {
  components: {
    TableHeading,
    TableCell,
    DialogCell,
    DialogAddRegistration,
    SelectWeek,
    BtnAddRegistragion,
    Loader
  },

  data: () => ({
    timeRegistration: ['9:00', '9:15', '9:30', '9:45', '10:00', '10:15'],
    registrations: []
  }),

  async mounted () {
    if (this.getCompanys().length === 0) {
      await this.fetchCompanys()
    }
    this.setHeaders()
  },

  methods: {
    ...mapMutations(['setHeaders', 'setRegistrations']),
    ...mapGetters(['getRegistrations', 'getCompanys']),
    ...mapActions(['fetchCompanys'])
  }
}
</script>

<style>
  .table__cell {
    border: 1px solid #808080;
  }

  .table__time {
    font-weight: 600;
  }

  @media (max-width: 755px) {

    .table__actions {
      margin-bottom: 20px;
    }

    .table__head {
      display: none;
    }

    .table__row {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .table__cell {
      padding: 10px 10px !important;
      height: 60px !important;
    }
  }
</style>
