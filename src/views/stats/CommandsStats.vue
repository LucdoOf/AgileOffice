<template>
  <div id="commands-stats">
    <div class="row">
      <CommandsChart class="w-s6"/>
    </div>
  </div>
</template>

<script>
import CommandsChart from '../../components/stats/CommandsChart'
export default {
  name: 'CommandsStats',
  components: { CommandsChart },
  created () {
    this.$store.dispatch('fetchCommands')
  }
}
</script>
