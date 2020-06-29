<template>
  <div class="box">
    <div class="box-title"><span class="title">Connections utilisateurs</span></div>
    <Chart chart="area" class="box-content" :series="usersChartData"/>
  </div>
</template>

<script>
import Chart from '../Chart'

export default {
  components: { Chart },
  name: 'UsersConnectionsChart',
  computed: {
    usersChartData () {
      const chartData = [{
        name: 'Connections utilisateurs',
        data: []
      }]
      const users = this.getUsers
      const toAggregate = []
      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        if (user && user.last_seen) {
          toAggregate.push({
            last_seen: user.last_seen_stamp * 1000,
            quantity: 1
          })
        }
      }
      const aggregatedData = this.$app.aggregatePerDay(toAggregate, 'last_seen', 'quantity')
      const keys = Object.keys(aggregatedData)
      for (let i = 0; i < keys.length; i++) {
        chartData[0].data.push([
          parseInt(keys[i]),
          this.$app.parseDecimal(aggregatedData[keys[i]])
        ])
      }
      chartData[0].data.sort((a, b) => a[0] < b[0])
      return chartData
    }
  }
}
</script>
