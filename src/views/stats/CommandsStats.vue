<template>
  <div id="commands-stats">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row">
          <AverageCommandsByDay class="col-12 wr"/>
        </div>
        <div class="row">
          <CommandsChart class="col-12 wr"/>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="row">
          <CommandsDayRepartitionChart class="col-12 wr"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommandsChart from '../../components/stats/CommandsChart'
import store from '../../store'
import AverageCommandsByDay from '../../components/stats/AverageCommandsByDay'
import CommandsDayRepartitionChart from '../../components/stats/CommandsDayRepartitionChart'
export default {
  name: 'CommandsStats',
  components: { CommandsDayRepartitionChart, AverageCommandsByDay, CommandsChart },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCommands')
    next()
  }
}
</script>
