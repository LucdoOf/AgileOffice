<template>
  <div class="box">
    <div class="box-title"><span class="title">Commandes passées</span></div>
    <Chart chart="area" class="box-content" :series="commandsChartData"/>
  </div>
</template>

<script>
import Chart from '../Chart'

export default {
  components: { Chart },
  name: 'CommandsChart',
  computed: {
    commandsChartData () {
      const chartData = [{
        name: 'Commandes passées',
        data: []
      }]
      const commands = this.getCommands
      const toAggregate = []
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        if (command) {
          toAggregate.push({
            order_date: command.order_date_stamp * 1000,
            quantity: 1
          })
        }
      }
      const aggregatedData = this.$app.aggregatePerDay(toAggregate, 'order_date', 'quantity')
      const keys = Object.keys(aggregatedData)
      for (let i = 0; i < keys.length; i++) {
        chartData[0].data.push([
          parseInt(keys[i]),
          this.$app.parseDecimal(aggregatedData[keys[i]])
        ])
      }
      return chartData
    }
  }
}
</script>
