<template>
  <div id="online-users" class="box small">
    <div class="box-content">
    <div class="field">
        <div class="label nowrap">Chiffre d'affaire {{ this.duration === 'today' ? "d'aujoud'hui" : ' du mois' }}</div>
        <div class="value xl nowrap">{{ this.$app.parseDecimal(todayTurnover) }} € TTC</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DurationTurnover',
  props: {
    duration: {
      type: String,
      default: 'today'
    }
  },
  computed: {
    todayTurnover () {
      const commands = this.duration === 'today' ? this.getTodayCommands : this.getMonthCommands
      return commands.reduce((total, command) => {
        const commandTotal = command.basket.entries.reduce((commandTotal, entry) => commandTotal + parseFloat(entry.entry_price), 0)
        return parseFloat(commandTotal) + parseFloat(total)
      }, 0)
    }
  }
}
</script>
