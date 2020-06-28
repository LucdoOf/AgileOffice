<template>
  <div id="global-stats">
    <div class="row">
      <DurationTurnover class="w-s6"/>
      <DurationTurnover class="w-s6" duration="month"/>
    </div>
    <div class="row">
      <TurnoverChart class="w-s6"/>
    </div>
  </div>
</template>

<script>
import TurnoverChart from '../../components/stats/TurnoverChart'
import store from '../../store'
import DurationTurnover from '../../components/stats/DurationTurnover'
export default {
  name: 'Stats',
  components: { DurationTurnover, TurnoverChart },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCommands').finally(() => {
      store.dispatch('fetchTodayCommands').finally(() => {
        store.dispatch('fetchMonthCommands').finally(() => {
          next()
        })
      })
    })
  }
}
</script>
