<template>
  <div id="global-stats">
    <div class="row">
      <TurnoverChart class="w-s6"/>
    </div>
  </div>
</template>

<script>
import TurnoverChart from '../../components/stats/TurnoverChart'
export default {
  name: 'Stats',
  components: { TurnoverChart },
  created () {
    this.$store.dispatch('fetchCommands')
  }
}
</script>
