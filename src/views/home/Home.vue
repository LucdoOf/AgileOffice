<template>
  <div id="home">
    <div class="row" id="main-numbers">
      <OnlineUsers class="w-s4"/>
      <TodayVisits class="w-s4"/>
      <TodayTurnover class="w-s4"/>
    </div>
    <div class="row">
      <div class="w-s6 box">
        <div class="box-title"><span class="title">Produits vendus</span></div>
        <Chart chart="area" class="box-content" :series="productsChartData"/>
      </div>
      <TurnoverChart class="w-s6"/>
    </div>
  </div>
</template>

<script>

import OnlineUsers from '../../components/home/OnlineUsers'
import { mapActions } from 'vuex'
import TodayVisits from '../../components/home/TodayVisits'
import TodayTurnover from '../../components/home/TodayTurnover'
import Chart from '../../components/Chart'
import TurnoverChart from '../../components/stats/TurnoverChart'

export default {
  name: 'Home',
  components: {
    TurnoverChart,
    Chart,
    TodayTurnover,
    TodayVisits,
    OnlineUsers
  },
  methods: {
    ...mapActions(['fetchCommands'])
  },
  created () {
    this.fetchCommands()
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
  }
}

</script>

<style scoped lang="scss">
</style>
