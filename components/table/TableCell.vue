<template>
  <td
    :class="[
      { 'notworking': isNotWorking(currentDate, time) },
      { 'full-registration': isFullRegistration(getAmount(currentDate, time)) }
    ]"
    class="text-center table__cell table__cell-not-full"
    @click="openCell(currentDate, time)"
  >
    <span class="table__mobile-descr">
      {{ currentDate.date.toLocaleDateString() }}
      {{ currentDate.weekDay }}
    </span>
    <span>
      {{ getAmount(currentDate, time) }}
    </span>
  </td>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    time: {
      type: String,
      require: true,
      default: ''
    },
    currentDate: {
      type: Object,
      require: true,
      default: Function
    }
  },

  methods: {
    ...mapMutations(['setCurrentCell', 'showCell']),
    ...mapGetters(['getRegistrations', 'getHeadersTable', 'getCurrentCell']),

    openCell (day, time) {
      if (this.isNotWorking(day, time)) {
        return
      }
      this.setCurrentCell(this.checkTimeReg(day, time))
      this.showCell()
    },

    checkDayRegInfo (checkDay) {
      const registrations = this.getRegistrations()
      const dayReg = registrations.filter(day => day.date.toLocaleDateString() === checkDay.date.toLocaleDateString())

      if (dayReg.length > 0) {
        return dayReg
      }
      return false
    },

    checkTimeReg (checkDay, checkTime) {
      const dayReg = this.checkDayRegInfo(checkDay)
      if (!dayReg) {
        return false
      }
      const timeReg = dayReg[0].times.filter(time => time.time === checkTime)
      return timeReg[0]
    },

    getAmount (day, time) {
      if (this.isNotWorking(day, time)) {
        return ''
      }

      const amount = this.checkTimeReg(day, time)
      if (amount === false) {
        return '+'
      }
      const amountReg = amount.amountReg
      if (amountReg === 0) {
        return '+'
      }
      if (amountReg === 3) {
        return amountReg
      }
      if (amountReg !== false) {
        return `${amountReg} +`
      }
    },

    isNotWorking (day, time) {
      const isPastDay = this.isPastDay(day)
      const indexWeekDay = day.date.getDay()
      if (indexWeekDay === 0 || indexWeekDay === 6 || time === '10:15' || isPastDay) {
        return true
      }
      return false
    },

    isPastDay (checkDay) {
      const today = new Date().toLocaleDateString()
      const isPastDay = checkDay.date.toLocaleDateString()

      const day = Number(today.slice(0, 2))
      const mounth = Number(today.slice(3, 5))
      const year = Number(today.slice(6, 10))

      const pastDay = Number(isPastDay.slice(0, 2))
      const pastMounth = Number(isPastDay.slice(3, 5))
      const pastYear = Number(isPastDay.slice(6, 10))

      if (year > pastYear) {
        return true
      }

      if (mounth > pastMounth) {
        return true
      }

      if (day > pastDay) {
        if (mounth > pastMounth || mounth === pastMounth) {
          return true
        }
      }
      return false
    },

    isFullRegistration (amountReg) {
      if (amountReg === 3) {
        return true
      }
      return false
    }
  }
}
</script>

<style>
  .table__cell-not-full {
    background-color: #C8E6C9;
    cursor: pointer;
  }

  .table__cell-not-full:hover {
    background-color: #A5D6A7;
  }

  .full-registration {
    background-color: #E57373;
  }

  .full-registration:hover {
    background-color: #EF5350;
  }

  .notworking {
    background-color: #BDBDBD;
    cursor: initial;
  }

  .notworking:hover {
    background-color: #BDBDBD;
  }

  .table__mobile-descr {
    display: none;
  }

  @media (max-width: 700px) {
    .table__mobile-descr {
      display: block;
      margin-bottom: 5px;
      font-weight: 400;
    }
  }
</style>
