<template>
  <div id="online-users" class="box small">
    <div class="box-content">
    <div class="field">
        <div class="label nowrap">Chiffre d'affaire d'aujourd'hui</div>
        <div class="value xl">{{ this.$app.parseDecimal(todayTurnover) }} € TTC</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodayTurnover',
  methods: {
    ...mapActions(['fetchTodayCommands'])
  },
  created () {
    this.fetchTodayCommands()
  },
  computed: {
    todayTurnover () {
      const todayCommands = this.getTodayCommands
      return todayCommands.reduce((total, command) => {
        const commandTotal = command.basket.entries.reduce((commandTotal, entry) => commandTotal + parseFloat(entry.entry_price), 0)
        return parseFloat(commandTotal) + parseFloat(total)
      }, 0)
    }
  }
}
</script>
