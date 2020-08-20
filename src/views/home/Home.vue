<template>
  <div id="home">
    <div class="row" id="main-numbers">
      <OnlineUsers class="col-12 col-lg-4"/>
      <TodayVisits class="col-12 col-lg-4"/>
      <DurationTurnover class="col-12 col-lg-4"/>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6 box">
        <div class="box-title"><span class="title">Produits vendus</span></div>
        <Chart chart="area" class="box-content" :series="productsChartData"/>
      </div>
      <TurnoverChart class="col-12 col-lg-6"/>
    </div>
  </div>
</template>

<script>

import OnlineUsers from '../../components/home/OnlineUsers'
import TodayVisits from '../../components/home/TodayVisits'
import Chart from '../../components/Chart'
import TurnoverChart from '../../components/stats/TurnoverChart'
import store from '../../store'
import DurationTurnover from '../../components/stats/DurationTurnover'

export default {
  name: 'Home',
  components: {
    DurationTurnover,
    TurnoverChart,
    Chart,
    TodayVisits,
    OnlineUsers
  },
  computed: {
    productsChartData () {
      const chartData = [{ name: 'Produits vendus', data: [] }]
      const commands = this.getCommands
      const toAggregate = []
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        if (command) {
          const quantity = command.basket.entries.reduce((total, obj) => parseInt(obj.quantity) + total, 0)
          toAggregate.push({
            order_date: command.order_date_stamp * 1000,
            quantity: quantity
          })
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
      return chartData
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCommands').finally(() => {
      store.dispatch('fetchTodayCommands').finally(() => {
        next()
      })
    })
  }
}

</script>

<style scoped lang="scss">
</style>
