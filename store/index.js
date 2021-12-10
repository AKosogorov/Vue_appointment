
export const state = () => ({
  headersTable: [],
  selectWeek: [],
  weeks: [],
  companys: [],
  registrations: [],
  currentCell: [],
  dialogCellVisible: false,
  dialogAddRegistrationVisible: false,
  loading: true
})

export const mutations = {

  setHeaders (state, payload) {
    let firstWeekDay

    if (payload) {
      const day = Number(payload.slice(0, 2))
      const mounth = Number(payload.slice(3, 5))
      const year = Number(payload.slice(6, 10))
      firstWeekDay = new Date(year, mounth - 1, day)
    } else {
      const today = new Date()
      firstWeekDay = new Date(today.setDate(today.getDate() - getFirstWeekDay(today)))
    }

    const dayOfTheMonth = firstWeekDay.getDate()

    const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    const headersTable = []

    for (let i = 0; i < 7; i++) {
      const header = {
        weekDay: weekDays[i],
        date: new Date(firstWeekDay.setDate(dayOfTheMonth + i))
      }

      headersTable.push(header)
    }

    state.headersTable = headersTable

    function getFirstWeekDay (date) {
      const indexToday = date.getDay()

      if (indexToday === 1) {
        return 0
      }

      if (indexToday === 0) {
        return 6
      }

      return indexToday - 1
    }
  },

  setWeeks (state) {
    const today = new Date()
    const firstWeekDay = new Date(today.setDate(today.getDate() - getFirstWeekDay(today)))
    const dayOfTheMonth = firstWeekDay.getDate()

    const toNextDay = days => new Date(firstWeekDay.setDate(dayOfTheMonth + days))
    const toStrDay = days => toNextDay(days).toLocaleDateString()

    state.weeks = [
      `${toStrDay(0)} - ${toStrDay(6)}`,
      `${toStrDay(7)} - ${toStrDay(13)}`,
      `${toStrDay(14)} - ${toStrDay(20)}`,
      `${toStrDay(21)} - ${toStrDay(27)}`
    ]

    function getFirstWeekDay (date) {
      const indexToday = date.getDay()

      if (indexToday === 1) {
        return 0
      }

      if (indexToday === 0) {
        return 6
      }

      return indexToday - 1
    }
  },

  setSelectWeek (state, payload) {
    state.selectWeek = payload
  },

  setCompanys (state, payload) {
    state.companys = payload
  },

  setRegistrations (state) {
    const registrations = []
    let companys = state.companys

    companys = companys.map((company) => {
      return {
        company: company.company.name,
        contact: company.phone,
        id: company.id
      }
    })

    randomRegistrations(companys)

    function randomRegistrations (user) {
      const today = new Date()
      const dayOfTheMonth = today.getDate()
      const daysRange = [0, 2, 4, 10, 12]

      daysRange.forEach((range) => {
        const dayReg = {
          date: toNextDay(range),
          times: [
            {
              time: '9:00',
              amountReg: 0,
              companysReg: []
            },
            {
              time: '9:15',
              amountReg: 0,
              companysReg: []
            },
            {
              time: '9:30',
              amountReg: 0,
              companysReg: []
            },
            {
              time: '9:45',
              amountReg: 0,
              companysReg: []
            },
            {
              time: '10:00',
              amountReg: 0,
              companysReg: []
            },
            {
              time: '10:15',
              amountReg: 0,
              companysReg: []
            }
          ]
        }

        registrations.push(dayReg)
      })

      user.forEach((user) => {
        if (registrations[0].times[0].amountReg < 3) {
          registrations[0].times[0].amountReg += 1
          return registrations[0].times[0].companysReg.push(user)
        }
        if (registrations[1].times[0].amountReg < 2) {
          registrations[1].times[0].amountReg += 1
          return registrations[1].times[0].companysReg.push(user)
        }
        if (registrations[2].times[0].amountReg < 1) {
          registrations[2].times[0].amountReg += 1
          return registrations[2].times[0].companysReg.push(user)
        }
        if (registrations[3].times[0].amountReg < 2) {
          registrations[3].times[0].amountReg += 1
          return registrations[3].times[0].companysReg.push(user)
        }
        if (registrations[4].times[0].amountReg < 3) {
          registrations[4].times[0].amountReg += 1
          return registrations[4].times[0].companysReg.push(user)
        }
      })

      function toNextDay (days) {
        let nextDay = new Date(today.setDate(dayOfTheMonth + days))
        if (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
          nextDay = toNextDay(days + 2)
        }
        return nextDay
      }
    }

    state.registrations = registrations
  },

  showCell (state) {
    state.dialogCellVisible = true
  },

  hideCell (state) {
    state.dialogCellVisible = false
  },

  showAddRegistration (state) {
    state.dialogAddRegistrationVisible = true
  },

  hideAddRegistration (state) {
    state.dialogAddRegistrationVisible = false
  },

  setCurrentCell (state, payload) {
    state.currentCell = payload
  },

  setLoading (state, payload) {
    state.loading = payload
  }
}

export const getters = {
  getHeadersTable (state) {
    return state.headersTable
  },

  getWeeks (state) {
    return state.weeks
  },

  getCompanys (state) {
    return state.companys
  },

  getRegistrations (state) {
    return state.registrations
  },

  getDialogCellVisible (state) {
    return state.dialogCellVisible
  },

  getDialogAddRegistrationVisible (state) {
    return state.dialogAddRegistrationVisible
  },

  getCurrentCell (state) {
    return state.currentCell
  },

  getLoading (state) {
    return state.loading
  }
}

export const actions = {
  fetchCompanys (context) {
    this.$axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => context.commit('setCompanys', res.data))
      .then(() => context.commit('setRegistrations'))
      .then(() => {
        setTimeout(() => {
          context.commit('setLoading', false)
        }, 3000)
      })
  }
}
