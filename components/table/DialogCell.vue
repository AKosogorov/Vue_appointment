<template>
  <v-dialog
    v-model="$store.getters.getDialogCellVisible"
    max-width="1000"
    @click:outside="$store.commit('hideCell')"
  >
    <v-card>
      <v-simple-table v-if="$store.getters.getCurrentCell">
        <thead class="dialog-table__head">
          <th
            v-for="header of headersTable"
            :key="header"
            class="text-center"
          >
            {{ header }}
          </th>
        </thead>
        <tbody>
          <tr
            v-for="company of $store.getters.getCurrentCell.companysReg"
            :key="company.id"
            :company="company"
            class="text-center dialog-table__row"
          >
            <td
              v-for="cell of company"
              :key="cell.id"
              class="dialog-table__cell"
            >
              {{ cell }}
            </td>
            <td class="dialog-table__cell_empty" />
            <td class="dialog-table__cell_empty" />
            <td>
              <v-btn
                color="red darken-1"
                text
              >
                Отменить
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-card-actions>
        <BtnCloseDialog
          @closeDialog="$store.commit('hideCell')"
        />
        <BtnAddRegistragion
          :disabled="$store.getters.getCurrentCell.amountReg === 3"
          @addRegistration="openAddRegistration"
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
  },
  computed: {
    headersTable () {
      return ['Компания', 'Контакты', 'Вид заявки', 'Количество СИ', 'Номера счетов', 'Действия']
    }
  },
  methods: {
    openAddRegistration () {
      this.$store.commit('hideCell')
      this.$store.commit('showAddRegistration')
    }
  }
}
</script>

<style>
  @media (max-width: 700px) {
    .dialog-table__head {
      display: none;
    }

    .dialog-table__row {
      display: flex;
      flex-direction: column;
    }

    .dialog-table__cell {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px !important;
    }

    .dialog-table__cell_empty {
      display: none;
    }
  }
</style>
