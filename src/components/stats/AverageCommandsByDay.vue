<template>
  <div class="box small">
    <div class="box-content">
      <div class="field">
        <div class="label nowrap">
          Nombre de commandes moyennes par jour
        </div>
        <div class="value xl">{{ this.$app.parseDecimal(averageCommands) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AverageCommandsByDay',
  computed: {
    averageCommands () {
      const commands = this.getCommands
      const toAggregate = []
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        if (command) {
          toAggregate.push({
            quantity: 1,
            order_date: command.order_date_stamp * 1000
          })
        }
      }
      const aggregatedData = this.$app.aggregatePerDay(toAggregate, 'order_date', 'quantity')
      return Object.values(aggregatedData).reduce((total, obj) => total + parseInt(obj), 0) / Object.values(aggregatedData).length
    }
  }
}
</script>
