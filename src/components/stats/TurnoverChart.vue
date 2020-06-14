<template>
  <div class="box">
    <div class="box-title"><span class="title">Chiffre d'affaire TTC (€)</span></div>
    <Chart chart="area" class="box-content" :series="turnoverChartData"/>
  </div>
</template>

<script>
import Chart from '../Chart'

export default {
  components: { Chart },
  computed: {
    turnoverChartData () {
      const chartData = [{
        name: "Chiffre d'affaire TTC (€)",
        data: []
      }]
      const commands = this.getCommands
      const toAggregate = []
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        if (command) {
          const amount = command.basket.entries.reduce((total, obj) => parseFloat(obj.entry_price) + total, 0)
          toAggregate.push({
            order_date: command.order_date_stamp * 1000,
            amount: amount
          })
        }
      }
      const aggregatedData = this.$app.aggregatePerDay(toAggregate, 'order_date', 'amount')
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
