<template>
  <div class="box">
    <div class="box-title"><span class="title">Dernières ventes</span></div>
    <Chart class="box-content" chart="area" :series="chartData" :height="height"/>
  </div>
</template>

<script>
import Chart from '../Chart'

export default {
  name: 'ProductCommandsChart',
  components: { Chart },
  props: {
    product: { },
    height: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    chartData () {
      const chartData = [{ name: 'Produits "' + this.product.name + '" vendus', data: [] }]
      const commands = this.$store.getters.getActualProductCommands
      const toAggregate = []
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        if (command) {
          for (let j = 0; j < command.basket.entries.length; j++) {
            const entry = command.basket.entries[j]
            if (entry && parseInt(entry.product_id) === parseInt(this.$store.getters.getActualProduct.id)) {
              toAggregate.push({
                order_date: command.order_date_stamp * 1000,
                quantity: entry.quantity
              })
            }
          }
        }
      }
      const aggregatedData = this.$app.aggregatePerDay(toAggregate, 'order_date', 'quantity')
      const keys = Object.keys(aggregatedData)
      for (let i = 0; i < keys.length; i++) {
        chartData[0].data.push([
          parseInt(keys[i]),
          aggregatedData[keys[i]]
        ])
      }
      chartData[0].data.sort(function (a, b) {
        return a[0] > b[0]
      })
      return chartData
    }
  }
}
</script>
