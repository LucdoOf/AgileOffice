<template>
  <div class="box">
    <div class="box-title"><span class="title">Ventes par jour de la semaine</span></div>
    <Chart chart="donut" class="box-content" :series="Object.values(productsChartData)" :labels="Object.keys(productsChartData)" :show-legend="false"/>
  </div>
</template>

<script>
import Chart from '../Chart'

export default {
  name: 'CommandsDayRepartitionChart',
  components: { Chart },
  computed: {
    productsChartData () {
      const commands = this.getCommands
      const toAggregate = []
      for (let i = 0; i < commands.length; i++) {
        const command = Object.assign({}, commands[i])
        if (command && command.basket && command.basket.entries) {
          command.aggregateQuantity = 1
          command.order_date_stamp = command.order_date_stamp * 1000
          toAggregate.push(command)
        }
      }
      return this.$app.aggregateByWeekDay(toAggregate, 'order_date_stamp', 'aggregateQuantity', true)
    }
  }
}
</script>
